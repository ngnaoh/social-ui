const FB_API_URL = process.env.NEXT_PUBLIC_FB_API_URL;
const FB_USER_ID = process.env.FB_USER_ID;

export async function getAllPagesAccess(facebookToken: string) {
  try {
    const response = await fetch(
      FB_API_URL +
        "/" +
        FB_USER_ID +
        "/accounts?" +
        new URLSearchParams({
          access_token: facebookToken.split("&")[0],
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {}
}

export async function createPost(
  pageToken: string,
  pageId: string,
  message: string,
  link?: string,
  schedule?: string
) {
  try {
    const query: any = {};
    query.message = message;

    if (link) query.link = link;
    if (schedule) {
      query.published = false;
      query.scheduled_publish_time = schedule;
    }
    query.access_token = pageToken;
    const response = await fetch(
      FB_API_URL +
        "/" +
        pageId +
        "/feed?" +
        new URLSearchParams({
          ...query,
        }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {}
}

export async function getPosts(pageId: string, pageToken: string) {
  try {
    const response = await fetch(
      FB_API_URL +
        "/" +
        pageId +
        "/feed?" +
        new URLSearchParams({
          access_token: pageToken,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {}
}
