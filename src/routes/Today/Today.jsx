import Header from "../../components/Header";
import Menu from "../../components/Menu";
import styled from "styled-components";
import dayjs from "dayjs";
import { useEffect, useContext, useState } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import Check from "../../assets/img/Vector.png"
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner'


export default function Today() {
    const days = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta'
    ]
    const { todayList, setTodayList, user, update, finished, setUpdate, setFinished, setPercentage, percentage } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)


    const dia = dayjs().day()
    const data = dayjs().format(' DD/MM')

    //Recarregando a lista de hábitos do dia
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then(res => {
            setTodayList(res.data)

            const novo = res.data

            let aux = 0
            let cont = 0
            novo.forEach(elm => {
                if (elm.done) {
                    aux = aux + 1
                }
                cont = cont + 1
            });
            setFinished((aux / cont) * 100)
            setPercentage((aux / cont) * 100)

            setLoading(false)

        })
        promise.catch(err => console.log(err))

    }, [update])


    //Marcar hábito como concluído
    function checkHabit(id) {

        setLoading(true)
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        const body = {}
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const promise = axios.post(URL, body, config)
        promise.then(res => {
            if (update) {
                setUpdate(false)
            } else { setUpdate(true) }
        })
        promise.catch(err => {
            setLoading(false)
            console.log(err)
        })
    }
    //Desmarcar hábito
    function uncheckHabit(id) {

        setLoading(true)
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
        const body = {}
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const promise = axios.post(URL, body, config)
        promise.then(res => {
            if (update) {
                setUpdate(false)
            } else { setUpdate(true) }

        })
        promise.catch(err => {
            setLoading(false)
            console.log(err)
        })
    }


    return (
        <TodayContainer>
            <Header />
            <Title>
                <h2>{days[dia] + data}</h2>
                {(finished === 0) ? <Msg color="#bababa">Nenhum hábito concluído ainda</Msg> : <Msg color="#8FC549">{percentage}% dos habitos concluídos</Msg>}
            </Title>
            <TodayHabitList>
                {todayList.map(habit =>
                    <TodayHabitCard key={habit.id} color={(habit.done) ? "#8FC549" : "#E7E7E7"}>
                        <div>
                            <h3>{habit.name}</h3>
                            <p>Sequencia atual: {habit.currentSequence}</p>
                            <p>Seu record: {habit.highestSequence}</p>
                        </div>
                        <button disabled={(loading) && true} onClick={(habit.done) ? () => uncheckHabit(habit.id) : () => checkHabit(habit.id)}>
                            {(loading) ? 
                                <ThreeDots
                                    height="20"
                                    width="50"
                                    radius="9"
                                    color="#ffffff"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                            /> :
                            <img src={Check} />
                            }
                        </button>
                    </TodayHabitCard>)}
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

    margin-bottom: 100px;

    background-color: transparent;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    >h2{
        font-weight: 400;
        font-size: 23px;
        color: #126BA5;
    }

`

const TodayHabitList = styled.div`
    margin-top: 30px;
`

const TodayHabitCard = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 94px;
    margin-bottom: 10px;
    padding: 15px;

    background-color: #ffffff;
    border-radius: 5px;

    >div{

        >h3{
            font-size: 20px;
            color: #666666;
            margin-bottom: 5px;
        }
        >p{
            font-size: 13px;
            color: #666666;
        }
    }

    > button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 69px;
        aspect-ratio: 1/1;

        background-color: ${props => props.color};

        border: none;
        border-radius: 5px;
    }
`

const Msg = styled.p`
    color: ${props => props.color};
`