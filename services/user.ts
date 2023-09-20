import { TUser } from "@/hooks/useUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function profile(accessToken: string) {
  try {
    const response = await fetch(API_URL + "/api/v1/users/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function update(accessToken: string, userId: string, data: TUser) {
  try {
    const response = await fetch(API_URL + "/api/v1/users/" + userId, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
