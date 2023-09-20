import * as React from "react";

export type TFBPost = {
  created_time: string;
  message: string;
  id: string;
};

const useGetPosts = () => {
  const [data, setData] = React.useState<TFBPost[]>([]);

  const get = async () => {
    const response = await fetch("/api/fb/feed", {
      method: "GET",
    });
    if (!response) return;
    const data = await response.json();
    const posts = data.data as TFBPost[];
    setData(posts);
    return posts;
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, refetch: get };
};

export default useGetPosts;
