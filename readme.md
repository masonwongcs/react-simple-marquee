# react-simple-marquee

A very simple Marquee component created by using CSS animation and React

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```
npm i react-simple-marquee --save
```

## Usage

Import Marquee component into your React component

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
