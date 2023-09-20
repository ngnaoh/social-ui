import * as React from "react";
import { TFBAccount } from "./useFBAccounts";

export type TFBPost = {
  created_time: string;
  message: string;
  id: string;
  sender: {
    name: string;
  };
};

const useGetPosts = () => {
  const [data, setData] = React.useState<TFBPost[]>([]);

  const get = async () => {
    const response = await fetch("/api/fb/feed", {
      method: "GET",
    });
    if (!response) return;
    const data = await response.json();
    const posts = data.posts.data as TFBPost[];

    const masterPosts: TFBPost[] = posts.map((post) => ({
      ...post,
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

export default useGetPosts;
