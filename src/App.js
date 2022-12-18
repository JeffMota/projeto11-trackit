import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login/Login";
import SignIn from "./routes/SignIn/SignIn";
import Habits from "./routes/Habits/Habits";
import GlobalContext from "./contexts/GlobalContext";
import { useEffect, useState } from "react";


function App() {
  const daysList = [
    { id: 0, name: 'D' },
    { id: 1, name: 'S' },
    { id: 2, name: 'T' },
    { id: 3, name: 'Q' },
    { id: 4, name: 'Q' },
    { id: 5, name: 'S' },
    { id: 6, name: 'S' }
]

  const [user, setUser] = useState(null)
  const [formInfos, setFormInfos] = useState({ name: '', days: [] })
  const [List, setList] = useState([])
  const [todayList, setTodayList] = useState([])
  const [update, setUpdate] = useState(false)


  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={
          { user, setUser, formInfos, setFormInfos, List, setList, 
          update, setUpdate, todayList, setTodayList, daysList,  }}>
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
