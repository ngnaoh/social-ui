"use client";

import * as React from "react";
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
import { TTokenType } from "@/types/common";

export type TSocialMedia = {
  name: string;
  icon: JSX.Element;
  description: string;
  type: TTokenType;
  urlAction: string;
};

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  socialMedia: TSocialMedia;
}

export function SocialMedia({ socialMedia }: AlbumArtworkProps) {
  const { user } = useUser();

  const disabled = React.useMemo(() => {
    switch (socialMedia.type) {
      case "facebookToken":
        return !!user?.facebookToken;
      case "instagramToken":
        return !!user?.instagramToken;
      case "twitterToken":
        return !!user?.twitterToken;
      default:
        return false;
    }
  }, [user, socialMedia.type]);

  return (
    <Card className="w-72">
      <CardHeader className="flex-row justify-between items-end">
        {socialMedia.icon}
        <Button variant="outline">
          <Link href={socialMedia.urlAction} target="_blank">
            {disabled ? "Renew" : "Add"}
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
