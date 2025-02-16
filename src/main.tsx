import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import App from './App.tsx'
import TrackerProvider from "./contexts/trackerProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TrackerProvider>
      <App />
    </TrackerProvider>
  </React.StrictMode>
)