import { TPost } from "@/components/post";
import * as React from "react";

type TInsPost = {
  id: string;
  caption?: string;
  username: string;
  media_url: string;
  media_type: string;
  timestamp: string;
};

const useGetInstagramPost = () => {
  const [data, setData] = React.useState<TPost[]>([]);

  const get = async () => {
    const response = await fetch("/api/instagram/feed", {
      method: "GET",
    });
    if (!response) return;
    const data = await response.json();
    const posts = data.data as TInsPost[];
    const normalizePost: TPost[] = posts.map((e) => ({
      id: e.id,
      image: e.media_url,
      message: e.caption,
      createdAt: e.timestamp,
      sender: {
        name: e.username,
      },
    }));
    setData(normalizePost);
    return normalizePost;
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, refetch: get };
};

export default useGetInstagramPost;
