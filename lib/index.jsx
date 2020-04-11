import * as React from "react";
import PropTypes from "prop-types";
import { useAnimationPlayState, useAnimationDuration } from "./hooks";

const Marquee = ({ speed, style, children }) => {
  const { textWrapper, animationPlayState } = useAnimationPlayState();
  const { textElem, animationDuration } = useAnimationDuration(speed);
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
            minWidth: "100%",
            display: "inline-block",
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
            minWidth: "100%",
            display: "inline-block",
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
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Marquee;
