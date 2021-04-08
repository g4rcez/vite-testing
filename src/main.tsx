import React, { lazy, StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";

const App = lazy(() => import("./App"));
const Other = lazy(() => import("./other"));

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename="/cool/0.0.1">
        <Route exact path="/brabo">
          <Other />
        </Route>
        <Route exact path="/">
          <App />
        </Route>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
  document.getElementById("root")
);
