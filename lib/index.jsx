import * as React from "react";
import PropTypes from "prop-types";
import {
  useAnimationPlayState,
  useAnimationDuration,
  VERTICAL_VALUE,
} from "./hooks";

const Marquee = ({ speed, direction = "right-left", style, children }) => {
  const { textWrapper, animationPlayState } = useAnimationPlayState();
  const { textElem, animationDuration } = useAnimationDuration(
    speed,
    direction
  );
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div
        className="text-wrapper"
        style={{
          whiteSpace: "nowrap",
          willChange: "transform",
          animationName: "dynamicMarqueeAnimation",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState,
          animationDuration,
        }}
        ref={textWrapper}
      >
        <div
          className="text-elem"
          style={{
            minWidth: VERTICAL_VALUE.includes(direction) ? undefined : "100%",
            minHeight: VERTICAL_VALUE.includes(direction) ? "100%" : undefined,
            display: VERTICAL_VALUE.includes(direction)
              ? "block"
              : "inline-block",
            marginRight: 40,
            boxSizing: "border-box",
          }}
          ref={textElem}
        >
          {children}
        </div>
        <div
          className="text-elem"
          style={{
            minWidth: VERTICAL_VALUE.includes(direction) ? undefined : "100%",
            minHeight: VERTICAL_VALUE.includes(direction) ? "100%" : undefined,
            display: VERTICAL_VALUE.includes(direction)
              ? "block"
              : "inline-block",
            marginRight: 40,
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Marquee.propTypes = {
  speed: PropTypes.number,
  direction: PropTypes.oneOf([
    "left-right",
    "right-left",
    "top-bottom",
    "bottom-top",
  ]),
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Marquee;
