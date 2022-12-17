import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import HabitCard from "../../components/HabitCard";
import Menu from "../../components/Menu";

export default function Habits(){
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    const [List, setList] = useState([])

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then(res => setList(res.data))
        promise.catch(err => console.log(err))

    }, [])

    return(
        <HabitsContainer>
            <Header />
            <Title>
                <h2>Meus hábitos</h2>
                <button>+</button>
            </Title>
            <HabitsList>
                {(List.length === 0) ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>:
                List.map(habit => <HabitCard name={habit.name} days={habit.days}/>)
            }
            </HabitsList>
            <Menu />
        </HabitsContainer>
    )
}

const HabitsContainer = styled.div`
    width: 100%;
    padding: 90px 20px;
    height: 100vh;

    background-color: #F2F2F2;
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
    
    >p{
        font-size: 22.47px;
        color: #666666;
    }
`