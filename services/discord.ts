export type DiscordAttachment = {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  content_type: string;
  ctx: Record<string, any>;
  boxes: Array<any>;
};

export const discordUpload = async (file: any) => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!discordWebhookUrl)
    throw new Error(
      'Please specify your discord webhook in .env file by "DISCORD_WEBHOOK_URL" key'
    );

  const formData = new FormData();

  if (Array.isArray(file)) {
    file.forEach((file, index) => {
      formData.append(`files[${index}]`, file.data, file.name);
    });
  } else {
    formData.append("file", file.data, file.name);
  }

  const response = await fetch(discordWebhookUrl, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  const { data } = await response.json();

  if (!data?.attachments?.length) throw new Error("No attachments found");

  const attachments = (data.attachments as DiscordAttachment[]).map(
    (attachment) => ({
      ...attachment,
      url: attachment.url.replace(
        "https://cdn.discordapp.com/attachments/",
        ""
      ),
      proxy_url: attachment.proxy_url.replace(
        "https://media.discordapp.net/attachments/",
        ""
      ),
    })
  );

  return attachments;
};
