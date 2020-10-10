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

const dynamicStyle = document.createElement("style");
dynamicStyle.type = "text/css";
let keyFrames = (DYNAMIC_VALUE, DIRECTION) => `
  @-webkit-keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE});
      transform: translate${DIRECTION}(${DYNAMIC_VALUE});
    }
  }
  @-moz-keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE});
      transform: translate${DIRECTION}(${DYNAMIC_VALUE});
    }
  }
  @keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translate${DIRECTION}(${DYNAMIC_VALUE});
      transform: translate${DIRECTION}(${DYNAMIC_VALUE});
    }
  }
`;

export const useAnimationDuration = (speed, direction) => {
  const textElem = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(undefined);
  useEffect(() => {
    document.querySelector("head").append(dynamicStyle);
    return () => {
      dynamicStyle.remove();
    };
  }, []);
  useEffect(() => {
    const marqueeRun = () => {
      const marqueeSpeed = speed || 1;
      const textElemDimension = textElem.current(
        VERTICAL_VALUE.includes(direction) ? "clientHeight" : "clientWidth"
      );
      const dimension = textElemDimension + 40;
      dynamicStyle.innerHTML = keyFrames(
        `${NEGATIVE_VALUE.includes(direction) ? "-" : ""}${dimension}px`,
        VERTICAL_VALUE.includes(direction) ? "Y" : "X"
      );
      setAnimationDuration(`${(dimension * 20) / marqueeSpeed}ms`);
    };
    marqueeRun();
    window.addEventListener("resize", marqueeRun);
    return () => {
      window.removeEventListener("resize", marqueeRun);
    };
  }, [speed, direction]);

  return { textElem, animationDuration };
};
