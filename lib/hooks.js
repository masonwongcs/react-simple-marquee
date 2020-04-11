import { useEffect, useRef, useState } from "react";

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

export const useAnimationDuration = (speed) => {
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
      const textElemWidth = textElem.current.clientWidth;
      const width = textElemWidth + 40;
      dynamicStyle.innerHTML = keyFrames.replace(
        /DYNAMIC_VALUE/g,
        `-${width}px`
      );
      setAnimationDuration(`${(width * 20) / marqueeSpeed}ms`);
    };
    marqueeRun();
    window.addEventListener("resize", marqueeRun);
    return () => {
      window.removeEventListener("resize", marqueeRun);
    };
  }, [speed]);

  return { textElem, animationDuration };
};
