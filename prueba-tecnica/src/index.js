import React from "react";
import ReactDOM from "react-dom/client"; // Correcto: usar createRoot
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = generateStore();

const root = ReactDOM.createRoot(document.getElementById("root")); // Crear el root

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
