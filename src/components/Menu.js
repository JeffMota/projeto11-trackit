import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components"

export default function Menu() {
    const percentage = 30

    return (
        <MenuContainer>
            <Habitos>Hábitos</Habitos>
            <Hoje>
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
            <Historico>Histórico</Historico>
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