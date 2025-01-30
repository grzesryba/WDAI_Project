import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.css";
import './i18n';


createRoot(document.getElementById("root")!).render(<App></App>);
