import React from "react";
import ReactDom from "react-dom";

import App from "./components/App";
import "../styles/main.css";

ReactDom.render(<App />, document.getElementById("root"));

// export function log(str: string) {
//     console.log(str);
// }

// class A {
//     gretting = "Hello Anil"
// }

// log(new A().gretting)
// log("Hello World!!!ß");