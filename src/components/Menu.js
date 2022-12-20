import { useContext, useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import GlobalContext from '../contexts/GlobalContext';

export default function Menu() {

    const {todayList, update, setFinished, percentage} = useContext(GlobalContext)
    
    const navigate = useNavigate()
 
    function redirect(caminho){
        navigate(caminho)
    }

    return (
        <MenuContainer>
            <Habitos onClick={() => redirect('/habitos')}>
                Hábitos
            </Habitos>
            <Hoje onClick={() => redirect('/hoje')}>
                <CircularProgressbar
                    value={percentage} 
                    text={`Hoje`}
                    background={true}
                    backgroundPadding={7}
                    styles={buildStyles({
                        textColor: `#ffffff`,
                        textSize: `22.47px`,
                        backgroundColor: `#52B6FF`,
                        trailColor: `#52B6FF`,
                        pathColor: `#ffffff`
                    })}
                />
            </Hoje>
            <Historico onClick={() => redirect('/historico')}>
                Histórico
            </Historico>
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    /* padding: 0 calc(25vw / 2); */

    height: 70px;
    width: 100%;

    position: fixed;
    left: 0;
    bottom: 0;

    background-color: #ffffff;

`

const Hoje = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 91px;
    height: 91px;

    border-radius: 50%;

    position: absolute;

    left: calc(50vw - 45.5px);
    bottom: 10px;

    :hover{
        cursor: pointer;
    }

`

const Habitos = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    font-size: 22.47px;

    color: #52B6FF;

    margin-right:50px;

    :hover{
        cursor: pointer;
    }

`
const Historico = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    font-size: 22.47px;

    color: #52B6FF;

    margin-left:50px;
`