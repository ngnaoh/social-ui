"use client";

import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import useUser from "@/hooks/useUser";

export type TSocialMedia = {
  name: string;
  icon: JSX.Element;
  description: string;
  type: TTokenType;
  urlAction?: string;
};

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  socialMedia: TSocialMedia;
}

type TTokenType = "facebookToken" | "instagramToken" | "twitterToken";

export function SocialMedia({ socialMedia }: AlbumArtworkProps) {
  const { user, refetch } = useUser();

  async function updateUser(tokenType: TTokenType, token: string) {
    const data: {
      facebookToken?: string;
    } = {};
    switch (tokenType) {
      case "facebookToken":
        data.facebookToken = token;
        break;
      case "instagramToken":
        break;
      case "twitterToken":
        break;

      default:
        break;
    }
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    refetch();
  }

  const disabled = React.useMemo(() => {
    switch (socialMedia.type) {
      case "facebookToken":
        return !!user?.facebookToken;

      default:
        return false;
    }
  }, [user, socialMedia.type]);

  React.useEffect(() => {
    const { hash, search } = window.location;
    const tokenType =
      (new URLSearchParams(search).get("type") as TTokenType) || "";
    const token = hash.split("=")[1];
    if (!tokenType || !token) return;
    updateUser(tokenType, token);
  }, []);

  return (
    <Card className="w-72">
      <CardHeader className="flex-row justify-between items-end">
        {socialMedia.icon}
        <Button variant="outline" disabled={disabled}>
          <Link href={socialMedia.urlAction || ""} target="_blank">
            {disabled ? "Added" : "Add"}
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">{socialMedia.name}</CardTitle>
        <CardDescription>{socialMedia.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
