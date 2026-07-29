import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'O elemento com id "root" não foi encontrado no arquivo index.html.',
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);