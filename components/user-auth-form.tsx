"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "react-otp-input";
import parsePhoneNumber from "libphonenumber-js";
import { useCookies } from "react-cookie";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import PhoneSelector, { TCountriesCode } from "./phone-selector";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const SpecialKeys: String[] = [
  "Backspace",
  "Tab",
  "ArrowDown",
  "ArrowUp",
  "ArrowRight",
  "ArrowLeft",
  "Delete",
  "Home",
];

const FormSignInSchema = z.object({
  code: z.string(),
  phone: z
    .string({
      required_error: "Please enter the phone.",
    })
    .min(4)
    .max(20),
});
const DefaultValue = {
  index: 229,
  value: "+84",
};
interface SignInProps {
  countries: TCountriesCode[];
  setAuthFormState: React.Dispatch<React.SetStateAction<TAuthFormState>>;
}
function SignIn({ countries, setAuthFormState }: SignInProps) {
  const form = useForm<z.infer<typeof FormSignInSchema>>({
    resolver: zodResolver(FormSignInSchema),
    defaultValues: {
      code: DefaultValue.value,
    },
  });

  function onSubmit(data: z.infer<typeof FormSignInSchema>) {
    const phone = data.code + data.phone.split(" ").join("");
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/sign-in";
    if (!url) return;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone.split("+")[1],
      }),
    });
    setAuthFormState((prev) => ({
      ...prev,
      data: {
        code: "",
        phone,
      },
      step: 1,
    }));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    const ctrlKey = e.ctrlKey || e.metaKey;
    if (keyCode > 47 && keyCode < 58) {
      return;
    }
    if (
      SpecialKeys.indexOf(e.key) !== -1 ||
      // Allow: Ctrl+A
      (keyCode == 65 && ctrlKey === true) ||
      // Allow: Ctrl+C
      (keyCode == 67 && ctrlKey === true) ||
      // Allow: Ctrl+X
      (keyCode == 88 && ctrlKey === true) ||
      // Allow: Ctrl+V
      (keyCode == 86 && ctrlKey === true) ||
      // Allow: home, end, left, right
      (keyCode >= 35 && keyCode <= 39)
    ) {
      return;
    }
    e.preventDefault();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <PhoneSelector
                  countries={countries}
                  setValue={(value) => form.setValue("code", value)}
                  value={field.value}
                  defaultIndex={DefaultValue.index}
                />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Input
                  id="phone"
                  autoCapitalize="none"
                  onKeyDown={handleKeyDown}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="outline">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

const NUM_INPUT = 6;

const FormVerifySchema = z.object({
  code: z
    .string({
      required_error: "Please enter your OTP!",
    })
    .length(6, {
      message: "Invalid OTP",
    }),
});
interface VerifyOTPProps {
  authFormState: TAuthFormState;
  submit: (data: TDataSubmit) => void;
  setAuthFormState: React.Dispatch<React.SetStateAction<TAuthFormState>>;
}
function VerifyOTP({
  authFormState,
  submit,
  setAuthFormState,
}: VerifyOTPProps) {
  const form = useForm<z.infer<typeof FormVerifySchema>>({
    resolver: zodResolver(FormVerifySchema),
  });

  function onSubmit(data: z.infer<typeof FormVerifySchema>) {
    submit({
      code: data.code,
      phone: authFormState.data.phone,
    });
  }

  const metadata = React.useMemo(() => {
    return parsePhoneNumber(authFormState.data.phone)?.formatInternational();
  }, [authFormState.data.phone]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <h1>Verification code has been sent to</h1>
          <b>{metadata}</b>
        </div>
        <div className="flex justify-center gap-2">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <OTPInput
                  value={field.value}
                  onChange={(otp) => form.setValue("code", otp)}
                  numInputs={NUM_INPUT}
                  renderSeparator={<div className="w-4" />}
                  renderInput={(props) => (
                    <Input
                      {...props}
                      disabled={authFormState.isLoading}
                      className="!w-11 h-14 text-center"
                    />
                  )}
                />
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setAuthFormState((prev) => ({
                ...prev,
                step: 0,
              }))
            }
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            className="flex-1"
            type="submit"
            disabled={authFormState.isLoading}
            variant="outline"
          >
            {authFormState.isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  countries: TCountriesCode[];
}
type TDataSubmit = {
  phone: string;
  code: string;
};
type TAuthFormState = {
  step: 0 | 1;
  isLoading: boolean;
  data: TDataSubmit;
};
export function UserAuthForm({ className, countries }: UserAuthFormProps) {
  const [authFormState, setAuthFormState] = React.useState<TAuthFormState>({
    step: 0,
    isLoading: false,
    data: {
      code: "",
      phone: "",
    },
  });
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "accessToken",
    "refreshToken",
    "userId",
  ]);

  async function signIn(data: TDataSubmit) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/verify-otp";
    if (!url) return;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone.split("+")[1],
        code: data.code,
      }),
    });
    if (!response) return;
    const result = await response.json();
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("accessToken", result?.data?.tokens?.accessToken);
    let expires = new Date();
    let endTime = new Date(result?.data?.tokens?.expiresIn);
    expires.setTime(expires.getTime() + endTime.getTime() * 1000);
    setCookie("accessToken", result?.data?.tokens?.accessToken, {
      path: "/",
      expires,
    });
    setCookie("refreshToken", result?.data?.tokens?.refreshToken, {
      path: "/",
      expires,
    });
    setCookie("userId", result?.data?.user?.id, {
      path: "/",
      expires,
    });
    router.push("/accounts");
  }

  return (
    <div className={cn("grid gap-6", className)}>
      {(function (step) {
        switch (step) {
          case 0:
            return (
              <SignIn
                countries={countries}
                setAuthFormState={setAuthFormState}
              />
            );
          case 1:
            return (
              <VerifyOTP
                submit={signIn}
                setAuthFormState={setAuthFormState}
                authFormState={authFormState}
              />
            );

          default:
            return null;
        }
      })(authFormState.step)}
    </div>
  );
}
