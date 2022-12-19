import axios from "axios"
import { useContext, useState } from "react"
import styled from "styled-components"
import Delete from "../assets/img/Delete.png"
import GlobalContext from "../contexts/GlobalContext"
import { ThreeDots } from 'react-loader-spinner'

export default function HabitCard({ name, days, id }) {

    const { user, setUpdate, update, daysList } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)

    function deleteHabit() {
        if(window.confirm('Deseja deletar esse hábito?')) {
            setLoading(true)

            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }

            const promise = axios.delete(URL, config)
            promise.then(res => {
                if (update) {
                    setUpdate(false)
                } else setUpdate(true)
                setLoading(false)
            })
            promise.catch(err => console.log(err))
        }
    }

    return (
        <HabitContainer>
            <h2>{name}</h2>
            <BtnDelete disabled={(loading) && true} onClick={deleteHabit}>
                {(loading) ?
                    <ThreeDots
                        height="15"
                        width="100"
                        radius="9"
                        color="#dbdbdb"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : <img src={Delete}></img>
                }
            </BtnDelete>
            <DayContainer>
                {daysList.map(day => <Day key={day.id} selected={(days.includes(day.id)) ? true : false}>{day.name}</Day>)}
            </DayContainer>
        </HabitContainer>
    )
}

const HabitContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 91px;

    padding: 10px 19px;
    margin-bottom: 10px;

    background-color: #ffffff;

    border-radius: 5px;
    
    position: relative;

    >h2{
        font-size: 19.98px;
        color: #666666;
        margin-bottom: 10px;
    }
`

const DayContainer = styled.div`
    display: flex;
`

const Day = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 4px;
    width: 30px;
    aspect-ratio: 1/1;
    background-color: ${props => (props.selected) ? '#cfcfcf' : '#ffffff'};

    color: ${props => (props.selected) ? '#ffffff' : '#dbdbdb'};
    border-radius: 5px;

    border: 1px solid #d4d4d4
`

const BtnDelete = styled.button`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    background-color: transparent;
    border: none;

    >img{
        height: 100%;
    }

    :hover{
        cursor: pointer;
    }
`