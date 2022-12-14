import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import SignIn from "./routes/SignIn/SignIn";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}/>
        <Route path={"/cadastro"} element={<SignIn />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
