import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import HabitCard from "../../components/HabitCard";
import Menu from "../../components/Menu";
import NewHabit from "../../components/NewHabit";
import GlobalContext from "../../contexts/GlobalContext";

export default function Habits(){
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    const {List, setList, update, setTodayList} = useContext(GlobalContext)
    const [adding, setAdding] = useState(false)

    //Carregar lista de todos os hábitos
    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then(res => {setList(res.data)})
        promise.catch(err => console.log(err))

    }, [update])

    // Carregar hábitos de hoje
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then(res => {setTodayList(res.data)})
        promise.catch(err => console.log(err))
    
      }, [update])

    function newHabit(){
        if(!adding){
            setAdding(true)
        }
        else setAdding(false)
    }

    return(
        <HabitsContainer>
            <Header />
            <Title>
                <h2>Meus hábitos</h2>
                <button onClick={newHabit}>{(adding) ? '-' : '+'}</button>
            </Title>
            <HabitsList>
                {(adding) && <NewHabit user={user} setAdding={setAdding}/>}
                {(List.length === 0) ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>:
                List.map(habit => <HabitCard key={habit.name} name={habit.name} days={habit.days} id={habit.id}/>)
            }
            </HabitsList>
            <Menu />
        </HabitsContainer>
    )
}

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 70px;
    padding: 20px;
    height: 100vh;

    background-color: transparent;

`

const Title = styled.div`
    align-items: center;

    display: flex;
    justify-content: space-between;


    >h2{
        font-weight: 400;
        font-size: 23px;
        color: #126BA5;
    }

    >button{
        width: 40px;
        height: 35px;

        background-color: #52B6FF;

        border: none;
        border-radius: 5px;

        color: #ffff;
        font-size: 23px;
    }

`

const HabitsList = styled.div`
    margin-top: 30px;

    padding-bottom: 100px;
    
    >p{
        font-size: 22.47px;
        color: #666666;
    }
`