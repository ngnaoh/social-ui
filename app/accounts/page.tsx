import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountContainer from "@/container/accounts";

export default async function Account() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) redirect("/");

  return <AccountContainer />;
}
