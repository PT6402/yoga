import { Link } from "react-router-dom";
import logoImg from "../assets/img/logo_yoga.jpg";
export interface LogoProps {
  img?: string;
  className?: string;
}

export default function Logo({
  img = logoImg,
  className = "flex-shrink-0",
}: LogoProps) {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {img ? (
        <img className={`block max-h-8 sm:max-h-10`} src={img} alt="Logo" />
      ) : (
        "Logo Here"
      )}
    </Link>
  );
}
