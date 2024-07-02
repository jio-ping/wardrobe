interface Svg {
  id?: string;
  color?: string;
  size?: number;
  logo?: boolean;
  mobile?: boolean;
}

// import Sprite from "@/assets/sprite.svg";
export default function Svg({
  id,
  color = "black",
  size = 28,
  logo,
  mobile,
}: Svg) {
  if (!logo) {
    return (
      <svg style={{ color }} width={size} height={size}>
        <use href={`sprite.svg#${id}`} />
      </svg>
    );
  } else {
    if (mobile) {
      return (
        <svg style={{ color }} width={size}>
          <use href={`logo.svg#mobile-${color}`} />
        </svg>
      );
    } else {
      return (
        <svg style={{ color }} width={size}>
          <use href={`logo.svg#web-${color}`} />
        </svg>
      );
    }
  }
}
