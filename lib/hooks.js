import { useEffect, useRef, useState } from "react";

export const NEGATIVE_VALUE = ["right-left", "bottom-top"];
export const VERTICAL_VALUE = ["top-bottom", "bottom-top"];

export const useAnimationPlayState = () => {
  const textWrapper = useRef(null);
  const [animationPlayState, setAnimationPlayState] = useState(undefined);
  useEffect(() => {
    const mouseOutHandler = function () {
      setAnimationPlayState("running");
    };
    const mouseInHandler = function () {
      setAnimationPlayState("paused");
    };
    textWrapper.current.addEventListener("mouseenter", mouseInHandler);
    textWrapper.current.addEventListener("mouseleave", mouseOutHandler);
    return () => {
      textWrapper.current.removeEventListener("mouseenter", mouseInHandler);
      textWrapper.current.removeEventListener("mouseleave", mouseOutHandler);
    };
  }, []);
  return { textWrapper, animationPlayState };
};

let keyFrames = (DYNAMIC_VALUE, DIRECTION) => {
  if (DYNAMIC_VALUE < 0) {
    return `
      @-webkit-keyframes dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION} {
        100% {
          -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
        }
      }
      @-moz-keyframes dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION} {
        100% {
          -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
        }
      }
      @keyframes dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION} {
        100% {
          -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
        }
      }
    `;
  }
  return `
      @-webkit-keyframes dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION} {
        0% {
          -webkit-transform: translate${DIRECTION}(-${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(0px);
        }
        100% {
          -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(0px);
        }
      }
      @-moz-keyframes dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION} {
        0% {
          -webkit-transform: translate${DIRECTION}(-${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(-${DYNAMIC_VALUE}px);
        }
        100% {
          -webkit-transform: translate${DIRECTION}(0px);
          transform: translate${DIRECTION}(0px);
        }
      }
      @keyframes dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION} {
        0% {
          -webkit-transform: translate${DIRECTION}(-${DYNAMIC_VALUE}px);
          transform: translate${DIRECTION}(-${DYNAMIC_VALUE}px);
        }
        100% {
          -webkit-transform: translate${DIRECTION}(0px);
          transform: translate${DIRECTION}(0px);
        }
      }
    `;
};

export const useAnimationDuration = (speed, direction) => {
  const textElem = useRef(null);
  const dynamicStyle = useRef(null);
  const [animationName, setAnimationName] = useState(undefined);
  const [animationDuration, setAnimationDuration] = useState(undefined);

  useEffect(() => {
    dynamicStyle.current = document.createElement("style")
    dynamicStyle.current.type = "text/css";
    document.querySelector("head").append(dynamicStyle.current);
    return () => {
      dynamicStyle.current.remove();
    };
  }, []);

  useEffect(() => {
    const marqueeRun = () => {
      const marqueeSpeed = speed || 1;
      const isVertical = VERTICAL_VALUE.includes(direction);
      const dimension =
        textElem.current[isVertical ? "clientHeight" : "clientWidth"] +
        (isVertical ? 0 : 40);
      const DYNAMIC_VALUE = NEGATIVE_VALUE.includes(direction)
        ? -dimension
        : dimension;
      const DIRECTION = VERTICAL_VALUE.includes(direction) ? "Y" : "X";
      if(dynamicStyle.current) {
        dynamicStyle.current.innerHTML = keyFrames(DYNAMIC_VALUE, DIRECTION);
      }
      setAnimationName(`dynamicMarqueeAnimation${DYNAMIC_VALUE + DIRECTION}`);
      setAnimationDuration(`${(dimension * 20) / marqueeSpeed}ms`);
    };
    marqueeRun();
    window.addEventListener("resize", marqueeRun);
    return () => {
      window.removeEventListener("resize", marqueeRun);
    };
  }, [speed, direction]);

  return { textElem, animationDuration, animationName };
};
