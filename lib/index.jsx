import * as React from "react";
import PropTypes from "prop-types";

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

class Marquee extends React.Component {
  constructor(props) {
    super(props);
    this.textElem = React.createRef();
    this.textWrapper = React.createRef();
    this.state = {
      marqueeOn: true
    };
    document.querySelector("head").append(dynamicStyle);
  }

  mouseOutHandler = function() {
    this.style.animationPlayState = "running";
  };
  mouseInHandler = function() {
    this.style.animationPlayState = "paused";
  };

  removeAllEventListener = () => {
    this.textWrapper.current.removeEventListener(
      "mouseenter",
      this.mouseInHandler
    );
    this.textWrapper.current.removeEventListener(
      "mouseleave",
      this.mouseOutHandler
    );
  };

  marqueeRun = () => {
    const { speed } = this.props;
    const marqueeSpeed = speed || 1;
    const textElemWidth = this.textElem.current.clientWidth;
    const width = textElemWidth + 40;
    dynamicStyle.innerHTML = keyFrames.replace(/DYNAMIC_VALUE/g, `-${width}px`);
    this.textWrapper.current.style.animation = `dynamicMarqueeAnimation ${(width *
      20) /
      marqueeSpeed}ms linear infinite`;

    this.textWrapper.current.addEventListener(
      "mouseenter",
      this.mouseInHandler
    );
    this.textWrapper.current.addEventListener(
      "mouseleave",
      this.mouseOutHandler
    );
  };

  componentDidMount() {
    this.marqueeRun();
    window.addEventListener("resize", this.marqueeRun);
  }

  componentWillUnmount() {
    this.removeAllEventListener();
    window.removeEventListener("resize", this.marqueeRun);
  }

  render() {
    const { children, style } = this.props;
    return (
      <div style={{ overflow: "hidden", ...style }}>
        <div
          className="text-wrapper"
          style={{ whiteSpace: "nowrap", willChange: "transform" }}
          ref={this.textWrapper}
        >
          <div
            className="text-elem"
            style={{
              minWidth: "100%",
              display: "inline-block",
              marginRight: 40,
              boxSizing: "border-box"
            }}
            ref={this.textElem}
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
            ref={this.textElem}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Marquee.propTypes = {
  speed: PropTypes.number,
  children: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Marquee;
