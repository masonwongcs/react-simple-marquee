import { CSSProperties, ComponentType } from 'react'

interface MarqueeProps {
  speed?: number;
  style?: CSSProperties
}
declare const Marquee: ComponentType<MarqueeProps>

export default Marquee
