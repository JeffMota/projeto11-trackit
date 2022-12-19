import Header from "../../components/Header";
import Menu from "../../components/Menu";
import styled from "styled-components";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext, useEffect } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import axios from "axios";


export default function Today() {
    const days = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta'
    ]
    const { todayList, setTodayList, user, update } = useContext(GlobalContext)

    useEffect(() => {

        console.log('aqui')
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then(res => {
            setTodayList(res.data)
        })
        promise.catch(err => console.log(err))

    }, [])

    const dia = dayjs().day()
    const data = dayjs().format(' DD/MM')


    return (
        <TodayContainer>
            <Header />
            <Title>
                <h2>{days[dia] + data}</h2>
            </Title>
            <TodayHabitList>
                {todayList.map(habit => <TodayHabitCard>Amem</TodayHabitCard>)}
            </TodayHabitList>
            <Menu />
        </TodayContainer>
    )
}



const TodayContainer = styled.div`
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

`

const TodayHabitList = styled.div`
    margin-top: 100px;
    background-color: red;
`

const TodayHabitCard = styled.div`
    
`