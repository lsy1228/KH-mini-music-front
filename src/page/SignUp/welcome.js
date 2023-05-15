import React ,{ useContext}from "react";
import imgLogo from "../../image/로고.png"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserInfo";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 650px);
    color: white;

    img {
        width: 200px;
        margin-top: 100px;
        margin-bottom: 40px;
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

    .wcMessage {
        font-size: 50px;
        font-weight: 530;
        text-align: center;
    }

    p {
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 0;
        text-align: center;
    }

    span {
        font-weight: 600;
    }

    .enjoy {
        font-weight: 5px;
        font-size: 15px;
        margin-top: 60px;
        color: gray;
        margin-bottom: 10px;
    }
    
    button {
        display: block;
        margin: 0 auto;
        width: 290px;
        height: 45px;
        background: #b12548;
        color: white;
        font-size: 20px;
        border-style: none;
        text-decoration: none;
    }

    a {
    text-decoration: none;
  }
`;

const Welcome = () => {
    const context = useContext(UserContext);
    const {signUpId} = context; // 회원가입한 아이디를 환영 문구에 띄움

    
    return(
       
        <Container>
            <p>안녕하세요</p>
            <div className="Logo">
                <img src={imgLogo} alt="logo" />
            </div>
            <div className="wcMessage">환영합니다!</div>
            <p><span>{signUpId}</span>님 회원가입이 완료되었습니다.</p>
            <p><span>aEL MUSIC</span>가입하신 <span>ID</span>는 <span>{signUpId}</span>입니다.</p>
            <p className="enjoy">aEL MUSIC의 컨텐츠를 즐겨보세요:)</p>
            <Link to="/">
                <button className="main">메인으로</button>
            </Link>
        </Container>
    );
};

export default Welcome;