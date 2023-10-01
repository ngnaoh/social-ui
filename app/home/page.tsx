import * as React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CreatePostDialog } from "@/components/create-post-dialog";
import { Sidebar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { TwitterPosts } from "./actions";
import FacebookPosts from "@/components/facebook-post";
import InstagramPosts from "@/components/instagram-post";

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) redirect("/");

  return (
    <div className="bg-background">
      <div className="grid lg:grid-cols-5">
        <Sidebar />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Input placeholder="Search here..." className="w-64" />
                <Button variant="outline">Search</Button>
              </div>
              <CreatePostDialog />
            </div>
            <Separator className="my-4" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Facebook
              </h2>
              <p className="text-sm text-muted-foreground">
                Posts on Facebook.
              </p>
            </div>
            <Separator className="my-4" />
            <FacebookPosts />
            <Separator className="my-4" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Instagram
              </h2>
              <p className="text-sm text-muted-foreground">
                Posts on Instagram.
              </p>
            </div>
            <Separator className="my-4" />
            <InstagramPosts />
            <Separator className="my-4" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Twitter</h2>
              <p className="text-sm text-muted-foreground">Posts on Twitter.</p>
            </div>
            <Separator className="my-4" />
            <TwitterPosts />
          </div>
        </div>
      </div>
    </div>
  );
}
