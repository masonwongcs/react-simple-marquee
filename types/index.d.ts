import { CSSProperties, ComponentType } from "react";

interface MarqueeProps {
  speed?: number;
  style?: CSSProperties;
  direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top";
}
declare const Marquee: ComponentType<MarqueeProps>;

export default Marquee;
