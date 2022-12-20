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
        'Sexta',
        'Sabado'
    ]
    const { todayList, setTodayList, loading, user, update, setLoading, setFinished, setPercentage, finished, setUpdate, percentage } = useContext(GlobalContext)
    

    const dia = dayjs().day()
    const data = dayjs().format(' DD/MM')
    const [novo, setNovo] = useState([])

    // Carregar hábitos de hoje
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
  
          let aux1 = res.data
          setNovo(res.data)
  
          let aux = 0
          let cont = 0
          aux1.forEach(elm => {
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
    }, [])


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
                <h2 data-test="today" >{days[dia] + ',' + data}</h2>
                {((finished === 0) || (novo.length == 0)) ? <Msg data-test="today-counter" color="#bababa">Nenhum hábito concluído ainda</Msg> : <Msg data-test="today-counter" color="#8FC549">{percentage.toFixed(0)}% dos habitos concluídos</Msg>}
            </Title>
            <TodayHabitList>
                {todayList.map(habit =>
                    <TodayHabitCard data-test="today-habit-container" sequence={habit.currentSequence} HighSequence={habit.highestSequence} key={habit.id} color={(habit.done) ? "#8FC549" : "#E7E7E7"}>
                        <div>
                            <h3 data-test="today-habit-name" >{habit.name}</h3>
                            <p data-test="today-habit-sequence" >Sequencia atual: <span>{habit.currentSequence} {(habit.currentSequence > 1) ? 'dias' : 'dia'}</span></p>
                            <p data-test="today-habit-record" >Seu record: <span>{habit.highestSequence} {(habit.highestSequence > 1) ? 'dias' : 'dia'}</span></p>
                        </div>
                        <button data-test="today-habit-check-btn" disabled={(loading) && true} onClick={(habit.done) ? () => uncheckHabit(habit.id) : () => checkHabit(habit.id)}>
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
        >:nth-child(2){
            >span{
                color: ${props => (props.color === "#8FC549") ? "#8FC549" : "#666666"};
            }
        }
        >:nth-child(3){
            >span{
                color: ${props => (props.sequence === props.HighSequence && props.HighSequence > 0) ? "#8FC549" : "#666666"};
            }
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