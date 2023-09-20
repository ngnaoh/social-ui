import * as React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/side-bar";
import { Separator } from "@/components/ui/separator";
import { SocialMedias } from "./actions";

export default async function Account() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) redirect("/");

  return (
    <div className="bg-background">
      <div className="grid lg:grid-cols-5">
        <Sidebar />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="px-4 py-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">Social</h2>
            <Separator className="my-4" />
            <SocialMedias />
          </div>
        </div>
      </div>
    </div>
  );
}
