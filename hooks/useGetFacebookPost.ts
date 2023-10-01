import { TPost } from "@/components/post";
import * as React from "react";

type TFBPost = {
  created_time: string;
  message: string;
  id: string;
  attachments: {
    data: any[];
  };
  sender: {
    name: string;
  };
};

const useGetFacebookPost = () => {
  const [data, setData] = React.useState<TPost[]>([]);

  const get = async () => {
    const response = await fetch("/api/facebook/feed", {
      method: "GET",
    });
    if (!response) return;
    const data = await response.json();
    const posts = data.posts.data as TFBPost[];
    const masterPosts: TPost[] = posts.map((post) => ({
      id: post.id,
      message: post.message,
      createdAt: post.created_time,
      image: post.attachments?.data[0]?.media?.image?.src,
      sender: data.sender,
    }));
    setData(masterPosts);
    return masterPosts;
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, refetch: get };
};

export default useGetFacebookPost;
