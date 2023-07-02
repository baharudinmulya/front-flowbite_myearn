import type { FC } from "react";

type AvatarProps = {
  src: string;
  alt: string;
  size: number;
  rounded: boolean;
};

const Avatar: FC<AvatarProps> = ({ src, alt, size, rounded }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-${size} h-${size} ${rounded ? "rounded-full" : ""}`}
    />
  );
};

export default Avatar;
