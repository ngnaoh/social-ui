"use client";

import * as React from "react";

import { TTokenType } from "@/types/common";
import { useRouter } from "next/navigation";

type HandleSocialAuthProps = {
  tokenType: TTokenType;
};

export default function HandleSocialAuth({ tokenType }: HandleSocialAuthProps) {
  const router = useRouter();
  async function updateUser(tokenType: TTokenType, token: string) {
    const data: {
      facebookToken?: string;
      instagramToken?: string;
      twitterToken?: string;
    } = {};
    switch (tokenType) {
      case "facebookToken":
        data.facebookToken = token.split("&")[0];
        break;
      case "instagramToken":
        data.instagramToken = token;
        break;
      case "twitterToken":
        data.twitterToken = token;
        break;

      default:
        break;
    }

    const response = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push("/accounts");
    }
  }

  React.useEffect(() => {
    let token = "";
    const { hash, search } = window.location;
    switch (tokenType) {
      case "facebookToken":
        token = hash.split("=")[1];
        break;
      case "instagramToken":
        token = new URLSearchParams(search).get("code") || "";
        break;

      default:
        break;
    }

    if (!token) return;

    updateUser(tokenType, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}
