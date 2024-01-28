import "./index.scss";
import axios from "axios";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./AppRouter";

function App() {
    if (localStorage.getItem("user") !== null) {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization =  JSON.parse(localStorage.getItem("user"))?.token;

            return config;
        });
    }

  return (
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
