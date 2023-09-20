"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DotsHorizontalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { useDebounce } from "@/hooks/useDebounce";
import { TFBPost } from "@/hooks/useGetPost";

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
  refetch: () => Promise<TFBPost[] | undefined>;
};

const Post = ({ data, refetch }: PostProps) => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [isLike, setIsLike] = React.useState(false);

  const debouncedValue = useDebounce<boolean>(isLike, 1000);

  async function deletePost() {
    const response = await fetch("/api/fb/feed", {
      method: "DELETE",
      body: JSON.stringify({
        id: data.id,
      }),
    });
    if (response.ok) {
      refetch();
      setShowDeleteDialog(false);
    }
  }

  React.useEffect(() => {
    //TODO add like
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  function handleLikePost() {
    setIsLike((prev) => !prev);
  }

  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 w-full">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>FB</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="mt-1 text-xs text-muted-foreground">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setOpenEditModal(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  className="text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <CardDescription>{data.message}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" onClick={handleLikePost}>
          {isLike ? <HeartFilledIcon /> : <HeartIcon />}
        </Button>
      </CardFooter>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This preset will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={deletePost}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default Post;
