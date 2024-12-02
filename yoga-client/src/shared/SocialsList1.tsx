import facebook from "../assets/img/socials/facebook.svg";
import twitter from "../assets/img/socials/twitter.svg";
import telegram from "../assets/img/socials/telegram.svg";
import youtube from "../assets/img/socials/youtube.svg";
export interface SocialsList1Props {
  className?: string;
}
export interface SocialType {
  name: string;
  icon: string;
  href: string;
}
const socials: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
];
export default function SocialsList1({
  className = "space-y-3",
}: SocialsList1Props) {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <div className="flex-shrink-0 w-5 ">
          <img src={item.icon} alt="" />
        </div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };
  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
}
