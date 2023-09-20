import { Metadata } from "next";
import path from "path";
import { promises as fs } from "fs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/user-auth-form";
import { ToggleTheme } from "@/components/toggle-theme";
import { TCountriesCode } from "@/components/phone-selector";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (accessToken?.value) redirect("/home");

  const fileContent = await fs.readFile(
    path.join(process.cwd(), "") + "/phone-country-code.json",
    "utf8"
  );
  const countries: TCountriesCode[] = JSON.parse(fileContent).countries;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="absolute top-10 right-10">
        <ToggleTheme />
      </div>
      <div className="w-1/3">
        <UserAuthForm countries={countries} />
      </div>
    </div>
  );
}
