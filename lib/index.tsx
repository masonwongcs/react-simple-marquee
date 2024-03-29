import React, { CSSProperties, useEffect, useRef } from "react";

let generateCSS = ({
  time,
  direction,
}: {
  time: number;
  direction: string;
}) => {
  return `
    @keyframes dynamicMarqueeAnimation-left-right {
      from {
        transform: translateX(-50%);
      }
      to {
        transform: translateX(0); 
      }
    }

    @keyframes dynamicMarqueeAnimation-right-left {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }

    @keyframes dynamicMarqueeAnimation-top-bottom {
      from {
        transform: translateY(-50%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes dynamicMarqueeAnimation-bottom-top {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-50%);
      }
    }

    .react-simple-marquee {
      display: flex;
      overflow: hidden;
    }

    .react-simple-marquee__marquee-wrapper {
      display: flex;
      align-items: center;
      flex-direction: ${
        direction === "top-bottom" || direction === "bottom-top"
          ? "column"
          : "row"
      };
      will-change: transform;
      animation-duration: ${time}s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    .react-simple-marquee__marquee-wrapper:hover {
      animation-play-state: paused;
    }

    .react-simple-marquee__marquee-wrapper.left-right {
      animation-name: dynamicMarqueeAnimation-left-right;
    }

    .react-simple-marquee__marquee-wrapper.right-left {
      animation-name: dynamicMarqueeAnimation-right-left;
    }

    .react-simple-marquee__marquee-wrapper.top-bottom {
      animation-name: dynamicMarqueeAnimation-top-bottom;
    }

    .react-simple-marquee__marquee-wrapper.bottom-top {
      animation-name: dynamicMarqueeAnimation-bottom-top;
    }

    .react-simple-marquee__marquee-elem {
      display: flex;
      align-items: center;
      flex-direction: ${
        direction === "top-bottom" || direction === "bottom-top"
          ? "column"
          : "row"
      };
    }
  `;
};

export interface MarqueeProps {
  speed?: number;
  style?: CSSProperties;
  direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top";
}

const Marquee: React.FC<MarqueeProps> = ({
  speed = 2,
  direction = "right-left",
  style,
  children,
}) => {
  const marqueeRef = useRef<null | HTMLDivElement>(null);
  const isVertical = direction === "top-bottom" || direction === "bottom-top";

  useEffect(() => {
    const isVertical = direction === "top-bottom" || direction === "bottom-top";
    const displacement = isVertical
      ? marqueeRef.current!.getBoundingClientRect().height
      : marqueeRef.current!.getBoundingClientRect().width;
    const dynamicStyle = document.createElement("style");
    dynamicStyle.type = "text/css";
    const time = (displacement / speed) * 0.1;

    if (dynamicStyle) {
      dynamicStyle.innerHTML = generateCSS({ time, direction });
    }
    document.querySelector("head")!.append(dynamicStyle);
    return () => {
      dynamicStyle?.remove();
    };
  }, []);

  return (
    <div
      className="react-simple-marquee"
      style={isVertical ? { ...style, ...{ height: "auto" } } : { ...style }}
    >
      <div className={`react-simple-marquee__marquee-wrapper ${direction}`}>
        <div className="react-simple-marquee__marquee-elem" ref={marqueeRef}>
          {children}
        </div>
        <div className="react-simple-marquee__marquee-elem">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
