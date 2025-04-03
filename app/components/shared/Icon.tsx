interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  size?: number | string;
  basePath?: string;
  className?: string;
}

export default function Icon({
  iconName,
  size = 20,
  basePath = "/svgs/_index.svg",
  className = "",
  ...rest
}: IconProps) {
  return (
    <svg
      className={`transition-all duration-300 fill-current ${className}`}
      width={size}
      height={size}
      aria-label={iconName}
      {...rest}
    >
      <use xlinkHref={`${basePath}#icon-${iconName}`}></use>
    </svg>
  );
}
