import { useContext, useState } from "react"
import styled from "styled-components"
import GlobalContext from "../contexts/GlobalContext"
import axios from "axios"
import { ThreeDots } from 'react-loader-spinner'

export default function NewHabit({ setAdding }) {

    const { formInfos, setFormInfos, user, setList, List, setUpdate, update, daysList } = useContext(GlobalContext)
    const [selectedDays, setSelectedDays] = useState(formInfos.days)
    const [name, setName] = useState(formInfos.name)
    const [loading, setLoading] = useState(false)

    function selectDay(day) {
        if (selectedDays.includes(day)) {
            let aux = selectedDays.filter(elm => elm != day)
            setSelectedDays(aux)
            setFormInfos({
                name: name,
                days: aux
            })
        }
        else {
            let aux = [...selectedDays, day]
            setSelectedDays(aux)
            setFormInfos({
                name: name,
                days: aux
            })
        }
    }

    function changeName(value) {
        setName(value)
        let aux = [...selectedDays]
        setSelectedDays(aux)
        setFormInfos({
            name: value,
            days: aux
        })
    }

    function getList(habit) {
        let aux = [...List, habit]
        if (update) {
            setUpdate(false)
        } else setUpdate(true)
        
        setList(aux)
        setLoading(false)
        setName('')
        setSelectedDays([])
    }

    function sendHabit(e) {
        e.preventDefault()
        setLoading(true)

        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const promise = axios.post(URL, formInfos, config)
        promise.then(res => getList(res.data))
        promise.catch(err => {
            setName('')
            setSelectedDays([])
            alert(err)
        })

    }


    return (
        <NewContainer onSubmit={(e) => sendHabit(e)}>
            <HabitName>
                <input
                    disabled={(loading) && true}
                    required
                    value={name}
                    onChange={(e) => changeName(e.target.value)}
                    placeholder="nome do hábito"
                />
                <div>
                    {daysList.map(day =>
                        <DaysBtn
                            key={day.id}
                            selected={(selectedDays.includes(day.id)) ? true : false}
                            onClick={() => selectDay(day.id)}
                            type="button"
                        >{day.name}
                        </DaysBtn>)}
                </div>
            </HabitName>
            <ButtonsCont>
                <Cancel
                    disabled={(loading) && true}
                    onClick={() => setAdding(false)}
                    type="button">Cancelar
                </Cancel>
                <Save disabled={(loading) && true} type="submit">
                    {(loading) ?
                        <ThreeDots
                            height="15"
                            width="80"
                            radius="9"
                            color="#ffff"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : "Salvar"}
                </Save>
            </ButtonsCont>
        </NewContainer>
    )
}

const NewContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 180px;

    padding: 19px;
    margin-bottom: 40px;

    background-color: #ffffff;

    border-radius: 5px;
`

const DaysBtn = styled.button`
        margin-right: 4px;
        width: 30px;
        aspect-ratio: 1/1;
        background-color: ${props => (props.selected) ? '#cfcfcf' : '#ffffff'};

        color: ${props => (props.selected) ? '#ffffff' : '#dbdbdb'};
        border-radius: 5px;

        border: 1px solid #d4d4d4
`

const HabitName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 60%;

    >input{
        width: 100%;
        height: 45px;

        border: 1px solid #d4d4d4;
        border-radius: 5px;
        padding: 0 10px;

        font-size: 19.98px;

        color: #dbdbdb;
    }

`

const ButtonsCont = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Save = styled.button`
    width: 84px;
    height: 35px;

    background-color: #52b6ff;

    border: none;
    border-radius: 5px;
    font-size: 16px;

    color: #ffffff;
`

const Cancel = styled.button`
    width: 84px;
    height: 35px;
    margin-right: 10px;
    font-size: 16px;

    color: #52b6ff;

    background-color: transparent;
    border: none;
`