import { SocialMedia, TSocialMedia } from "@/components/social-media";
import { Icons } from "@/components/ui/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const socialMedias: TSocialMedia[] = [
  {
    name: "Facebook",
    icon: <Icons.facebook />,
    description: "Manage Facebook Pages and Group",
    type: "facebookToken",
    urlAction:
      "https://www.facebook.com/v18.0/dialog/oauth?client_id=847086740287198&display=popup&response_type=token&redirect_uri=http://localhost:3000/accounts?type=facebookToken",
  },
  {
    name: "Instagram",
    icon: <Icons.instagram />,
    type: "instagramToken",
    description: "Manage Facebook Pages and Group",
    // onClick() {},
  },
  {
    name: "Twitter",
    icon: <Icons.twitter />,
    type: "twitterToken",
    description: "Manage Facebook Pages and Group",
    // onClick() {},
  },
];
export async function SocialMedias() {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {socialMedias.map((sm) => (
            <SocialMedia key={sm.name} socialMedia={sm} className="w-[250px]" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
