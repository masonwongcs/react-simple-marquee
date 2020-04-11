import * as React from "react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

const dynamicStyle = document.createElement("style");
dynamicStyle.type = "text/css";
let keyFrames = `
  @-webkit-keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translateX(DYNAMIC_VALUE);
      transform: translateX(DYNAMIC_VALUE);
    }
  }
  @-moz-keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translateX(DYNAMIC_VALUE);
      transform: translateX(DYNAMIC_VALUE);
    }
  }
  @keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translateX(DYNAMIC_VALUE);
      transform: translateX(DYNAMIC_VALUE);
    }
  }
`;

const Marquee = ({ speed, style, children })=>{
  const textElem = useRef(null);
  const textWrapper = useRef(null);
  const [animationPlayState, setAnimationPlayState] = useState(undefined)
  const [animation, setAnimation] = useState(undefined)
  useEffect(()=>{
    document.querySelector("head").append(dynamicStyle);
    marqueeRun();
    window.addEventListener("resize", marqueeRun);
    return ()=> {
      textWrapper.current.removeEventListener(
        "mouseenter",
        mouseInHandler
      );
      textWrapper.current.removeEventListener(
        "mouseleave",
        mouseOutHandler
      );
      window.removeEventListener("resize", marqueeRun)
    }
  }, []);

  const mouseOutHandler = useCallback(function() {
    setAnimationPlayState('running');
  }, []);
  const mouseInHandler = useCallback(function() {
    setAnimationPlayState('paused');
  }, []);

  const marqueeRun = useCallback(() => {
    const marqueeSpeed = speed || 1;
    const textElemWidth = textElem.current.clientWidth;
    const width = textElemWidth + 40;
    dynamicStyle.innerHTML = keyFrames.replace(/DYNAMIC_VALUE/g, `-${width}px`);
    setAnimation(`dynamicMarqueeAnimation ${(width *
      20) /
    marqueeSpeed}ms linear infinite`)

    textWrapper.current.addEventListener(
      "mouseenter",
      mouseInHandler
    );
    textWrapper.current.addEventListener(
      "mouseleave",
      mouseOutHandler
    );
  }, [speed]);

  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div
        className="text-wrapper"
        style={{ whiteSpace: "nowrap", willChange: "transform", animationPlayState, animation }}
        ref={textWrapper}
      >
        <div
          className="text-elem"
          style={{
            minWidth: "100%",
            display: "inline-block",
            marginRight: 40,
            boxSizing: "border-box"
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
            boxSizing: "border-box"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Marquee.propTypes = {
  speed: PropTypes.number,
  children: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Marquee;
