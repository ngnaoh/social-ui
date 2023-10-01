const API_URL = process.env.NEXT_PUBLIC_INSTAGRAM_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;

export async function getAccessToken(code: string) {
  try {
    const form = new FormData();
    form.append("client_id", CLIENT_ID as string);
    form.append("client_secret", CLIENT_SECRET as string);
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", REDIRECT_URI as string);
    form.append("code", code);
    const response = await fetch(API_URL + "/oauth/access_token", {
      method: "POST",
      body: form,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
