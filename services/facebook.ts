const API_URL = process.env.NEXT_PUBLIC_FACEBOOK_API_URL;
const USER_ID = process.env.FACEBOOK_USER_ID;

export async function getAllPagesAccess(facebookToken: string) {
  try {
    const response = await fetch(
      API_URL +
        "/" +
        USER_ID +
        "/accounts?" +
        new URLSearchParams({
          access_token: facebookToken,
          fields: "instagram_business_account,name,access_token",
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
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
      API_URL +
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
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(pageId: string, pageToken: string) {
  try {
    const response = await fetch(
      API_URL +
        "/" +
        pageId +
        "/feed?" +
        new URLSearchParams({
          access_token: pageToken,
          fields: "message,created_time,attachments",
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(pagePostId: string, pageToken: string) {
  try {
    const response = await fetch(
      API_URL +
        "/" +
        pagePostId +
        "?" +
        new URLSearchParams({
          access_token: pageToken,
        }),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
