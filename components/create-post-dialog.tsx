"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { MultipleFilter, TSelectOption } from "./multiple-filter";
import { DateTimePicker } from "./ui/date-time-picker/date-time-picker";
import { Icons } from "./ui/icons";
import { Input } from "./ui/input";
import useAccounts, { TAccountTypes } from "@/hooks/useAccounts";

const TEN_MINUTE_TIMESTAMP = 600000;

const FormSchema = z.object({
  // image: z.instanceof(File).nullable().optional(),
  image: z.string().optional(),
  message: z.string({
    required_error: "Message in required",
  }),
  senders: z
    .string({
      required_error: "Senders in required",
    })
    .array()
    .min(1),
  schedule: z
    .date()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val.getTime() - new Date().getTime() > TEN_MINUTE_TIMESTAMP;
      },
      {
        message:
          "The published date must be between 10 minutes and 30 days from now.",
      }
    ),
  link: z.string().optional(),
});

export function CreatePostDialog() {
  const [open, setOpen] = React.useState(false);
  const { data } = useAccounts();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function createPost(
    type: TAccountTypes,
    formData: z.infer<typeof FormSchema>
  ) {
    return fetch(`/api/${type}/feed`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let isFailed = true;
    const formData: any = { ...data };
    if (data.schedule) {
      formData.schedule = data.schedule.getTime() / 1000;
    }

    for (let index = 0; index < data.senders.length; index++) {
      const element = await createPost(
        data.senders[index].split("-")[0] as TAccountTypes,
        formData
      );
      if (!element.ok) {
        isFailed = true;
      }
    }

    if (isFailed) {
      setOpen(false);
    }
  }

  const socials = React.useMemo<TSelectOption[]>(() => {
    const accounts: TSelectOption[] = data?.map((e) => ({
      value: `${e.type}-${e.id}-${e.access_token}`,
      label: e.name,
      disabled: false,
      icon: Icons[e.type],
    }));

    const twiAccounts = [
      {
        value: "twitter",
        label: "Twitter",
        icon: Icons.twitter,
        disabled: true,
      },
    ];

    return [...accounts, ...twiAccounts];
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Create a post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70vw] h-[65vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <DialogHeader>
              <DialogTitle>Create a post</DialogTitle>
              <DialogDescription>
                Make changes to your post here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-5 flex-1 flex-col">
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="senders"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultipleFilter
                          title="Socials"
                          options={socials}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Url</FormLabel>
                      <FormControl>
                        <Input type="input" onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your content..."
                          className="resize-none"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3">
                <div className="mt-3 w-1/2">
                  <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Schedule</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            granularity={"minute"}
                            onChange={(value) => {
                              field.onChange(new Date(value.toString()));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-3 w-1/2">
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input placeholder="" onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
