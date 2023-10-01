const API_URL = process.env.NEXT_PUBLIC_INSTAGRAM_API_URL;
const FB_GRAPH_URL = process.env.NEXT_PUBLIC_FACEBOOK_API_URL;
const GRAPH_URL = process.env.NEXT_PUBLIC_INSTAGRAM_GRAPH_URL;
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
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getMedias(token: string) {
  try {
    const response = await fetch(
      GRAPH_URL +
        "/me/media?" +
        new URLSearchParams({
          fields: "id,caption,username,media_url,media_type,timestamp",
          access_token: token,
        })
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserNode(token: string) {
  try {
    const response = await fetch(
      GRAPH_URL +
        "/me?" +
        new URLSearchParams({
          fields: "id,username",
          access_token: token,
        })
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createContainer(
  userToken: string,
  igUserId: string,
  image: string,
  message?: string
) {
  try {
    const response = await fetch(
      FB_GRAPH_URL +
        `/${igUserId}/media?` +
        new URLSearchParams({
          image_url: image,
          caption: message || "",
          access_token: userToken,
        }),
      {
        method: "POST",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function publishContainer(
  userToken: string,
  igUserId: string,
  containerId: string
) {
  try {
    const response = await fetch(
      FB_GRAPH_URL +
        `/${igUserId}/media_publish?` +
        new URLSearchParams({
          creation_id: containerId,
          access_token: userToken,
        }),
      {
        method: "POST",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
