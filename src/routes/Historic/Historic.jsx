import styled from "styled-components";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

export default function Historic() {
    return (
        <HabitsContainer>
            <Header />
            <Title>
                <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
            </Title>
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
        font-size: 20px;
        color: #666666;
    }

`
