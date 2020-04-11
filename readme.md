# react-simple-marquee

A very simple Marquee component created by using CSS animation and React

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Demo
![](demo.gif)

Link to demo: https://react-simple-marquee.surge.sh

## Installation

```sh
npm i react-simple-marquee --save
```

## Usage

Import Marquee component into your React component

#### Using React Hooks

```jsx
import * as React from "react";
import ReactDOM from "react-dom";
import Marquee from "react-simple-marquee";

const App = () => (
  <Marquee
    speed={2} // Speed of the marquee (Optional)
    style={{
      height: 30 // Your own styling (Optional)
    }}
  >
    Your text here
  </Marquee>
);

ReactDOM.render(<App />, document.getElementById("root"));
```

#### Using React Class Component

```jsx
import * as React from "react";
import ReactDOM from "react-dom";
import Marquee from "react-simple-marquee";

class App extends React.Component {
  render() {
    return (
      <Marquee
        speed={2} // Speed of the marquee (Optional)
        style={{
          height: 30 // Your own styling (Optional)
        }}
      >
        Your text here
      </Marquee>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```
