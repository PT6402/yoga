interface Props {
  className?: string;
  color?: string;
  strokeWidth?: string;
}
export default function VariantIcon({
  className = "w-6 h-6 text-inherit",
  color = "#000",
  strokeWidth = "1.2",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        id="SVGRepo_iconCarrier"
        fill={color}
        fillRule="evenodd"
        d="M10.5 4.5A1.5 1.5 0 0 0 9 6v3c0 .373.136.714.361.977L6.77 13H5.5A1.5 1.5 0 0 0 4 14.5v3A1.5 1.5 0 0 0 5.5 19h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 8.5 13h-.413l2.161-2.521q.123.021.252.021h3q.129 0 .252-.021l2.163 2.523A1.5 1.5 0 0 0 14.5 14.5v3A1.5 1.5 0 0 0 16 19h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 19 13h-1.77l-2.591-3.023C14.864 9.714 15 9.373 15 9V6a1.5 1.5 0 0 0-1.5-1.5zm6.496 9.5H19a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5zM5.5 14h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5ZM10 6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3A.5.5 0 0 1 10 9z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
