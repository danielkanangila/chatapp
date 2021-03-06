import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import WebSocketContextProvider from "./webSocket";

import { theme } from "./themes/theme";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <WebSocketContextProvider>
            <Routes />
          </WebSocketContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
