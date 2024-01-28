import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <MantineProvider>
         <Router />
      </MantineProvider>
   </React.StrictMode>
);
