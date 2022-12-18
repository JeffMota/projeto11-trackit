import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import SignIn from "./routes/SignIn/SignIn";
import Habits from "./routes/Habits/Habits";
import GlobalContext from "./contexts/GlobalContext";
import { useState } from "react";


function App() {
  const [user, setUser] = useState(null)
  const [formInfos, setFormInfos] =useState({name: '', days: []})
  const [List, setList] = useState([])
  const [update, setUpdate] = useState(false)

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{user, setUser, formInfos, setFormInfos, List, setList, update, setUpdate}}>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/cadastro"} element={<SignIn />} />
          <Route path={"/habitos"} element={<Habits />} />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
