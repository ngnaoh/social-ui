import HomeContainer from "@/container/home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) redirect("/");

  return <HomeContainer />;
}
