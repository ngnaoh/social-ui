import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Icons } from "@/components/ui/icons";
import { Sidebar } from "@/components/side-bar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SocialMedia, TSocialMedia } from "@/components/social-media";

const socialMedias: TSocialMedia[] = [
  {
    name: "Facebook",
    icon: <Icons.facebook />,
    description: "Manage Facebook Pages and Group",
    type: "facebookToken",
    urlAction:
      "https://www.facebook.com/v18.0/dialog/oauth?client_id=847086740287198&display=popup&response_type=token&redirect_uri=http://localhost:3000/accounts?type=facebookToken",
  },
  {
    name: "Instagram",
    icon: <Icons.instagram />,
    type: "instagramToken",
    description: "Manage Facebook Pages and Group",
    // onClick() {},
  },
  {
    name: "Twitter",
    icon: <Icons.twitter />,
    type: "twitterToken",
    description: "Manage Facebook Pages and Group",
    // onClick() {},
  },
];

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
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {socialMedias.map((sm) => (
                    <SocialMedia
                      key={sm.name}
                      socialMedia={sm}
                      className="w-[250px]"
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
