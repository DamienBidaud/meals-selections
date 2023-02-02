import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./styles";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Step1 from "./pages/step1";
import Step2 from "./pages/step2";
import Step3 from "./pages/step3";
import Step4 from "./pages/step4";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Step1 />,
  },
  { path: "/step2", element: <Step2 /> },
  { path: "/step3", element: <Step3 /> },
  { path: "/step4", element: <Step4 /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
