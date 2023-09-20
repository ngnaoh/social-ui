import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TFBPost } from "@/hooks/useGetPosts";

export const PostSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

type PostProps = {
  data: TFBPost;
};

const Post = ({ data }: PostProps) => {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false,
                    timeZone: "America/Los_Angeles",
                  }).format(new Date(data.created_time))}
                </p>
              </div>
            </div>
          </div>
        </CardTitle>
        <CardDescription>{data.message}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6"></CardContent>
    </Card>
  );
};

export default Post;
