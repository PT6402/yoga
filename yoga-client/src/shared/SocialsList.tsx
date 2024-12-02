import facebook from "../assets/img/socials/facebook.svg";
import twitter from "../assets/img/socials/twitter.svg";
import telegram from "../assets/img/socials/telegram.svg";
import youtube from "../assets/img/socials/youtube.svg";
import { SocialType } from "./SocialsShare";
export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}
const socialsDemo: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
];
export default function SocialsList({
  className = "",
  itemClass = "block w-6 h-6",
  socials = socialsDemo,
}: SocialsListProps) {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <img src={item.icon} alt="" />
        </a>
      ))}
    </nav>
  );
}
