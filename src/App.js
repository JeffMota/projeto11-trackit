import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import SignIn from "./routes/SignIn/SignIn";
import Habits from "./routes/Habits/Habits";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}/>
        <Route path={"/cadastro"} element={<SignIn />}/>
        <Route path={"/habitos"} element={<Habits />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
