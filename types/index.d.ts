import { CSSProperties, ComponentType } from 'react'

declare module Marquee {
  export default ComponentType<{
    speed: number
    style?: CSSProperties
  }>
}
