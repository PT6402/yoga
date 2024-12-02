import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import "./index.css";
import "./assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";

createRoot(document.getElementById("root")!).render(<App />);
