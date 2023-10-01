import { SocialMedia, TSocialMedia } from "@/components/social-media";
import { Icons } from "@/components/ui/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const socialMedias: TSocialMedia[] = [
  {
    name: "Facebook",
    icon: <Icons.facebook />,
    description: "Manage Facebook Pages and Group",
    type: "facebookToken",
    urlAction: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&display=popup&response_type=token&redirect_uri=${process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI}`,
  },
  {
    name: "Instagram",
    icon: <Icons.instagram />,
    type: "instagramToken",
    description: "Manage Instagram Pages and Group",
    urlAction: `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`,
  },
  {
    name: "Twitter",
    icon: <Icons.twitter />,
    type: "twitterToken",
    description: "Manage Facebook Pages and Group",
    urlAction:
      "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=bWJIRVZVSFl6aHhRa2lUaUhpd1k6MTpjaQ&redirect_uri=https://a8f0-14-165-70-50.ngrok-free.app/accounts/twitter&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain",
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
