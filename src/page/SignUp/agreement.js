import React, { useState }from "react";
import styled from "styled-components";
import imgLogo from "../../image/로고.png"
import { Link } from "react-router-dom";


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 650px);

`;

 
const Inercontainer = styled.div`
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;

    img {
        width: 200px;
        margin: 100px 100px;
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

    p {
        margin:10px 0 5px 45px;
        display: flex;        
        overflow-y: scroll;
        border-radius: 10px;
        color: white;
        line-height: 200%;
        border: 1px solid white;
        width: 400px;
        height: 100px;
        padding: 5px;
        -ms-overflow-style: none;
        ::-webkit-scrollbar {
            display: none;
        }
    }

    span {
        font-weight: bolder;
        color: white;
    }
    
    .radio {
        width: 600px;
        margin: auto;
        justify-content: center;
        align-items: center;
    }
    
    .btn {
        display: flex;
        margin: 10px;
        justify-content: center;
        align-items: center;
    }

    .cancleBtn {
        width: 180px;
        height: 45px;
        margin-right: 20px;
        border-style: none;
        background: #d4cacd;
        font-size: 15px;
        font-weight: 500;
        border-radius: 10px;
    }

    .comfirmBtn {
        width: 180px;
        height: 45px;
        border-style: none;
        color: white;
        background: #b12548;
        font-size: 15px;
        font-weight: 500;
        border-radius: 10px;
        :disabled {
            background: #d4cacd;
            color: black;
        }
    }
`;



const Agreement = () => { // 필수조건을 체크해야 버튼이 활성화 됨
    const [oneCheck, setOneCheck] = useState(false);
    const [twoCheck, setTwoCheck] = useState(false);
    
    const oneRadio = () => { // 첫번째 필수 체크항목
        if (oneCheck === false) {
            setOneCheck(true);
        } else {
            setOneCheck(false);
        }
    }

    const twoRadio = () => { // 두번째 필수 체크 항목
        if (twoCheck === false) {
            setTwoCheck(true);
        } else {
            setTwoCheck(false);
        }
    }
    

    return(
        <Container>
            <Inercontainer>
                <div className="Logo">
                    <Link to="/"><img src={imgLogo} alt="logo" /></Link>
                </div>
            <div className="radio">
                <label htmlFor=""></label>
                <input checked={oneCheck} type="checkbox" name="1" onClick={oneRadio}/><span>aEl MUSIC 이용약관 동의(필수)</span>
                <p>여러분을 환영합니다 <br />
                aEl MUSIC 서비스 및 제품(이하'서비스')을 이용해 주셔서 감사합니다. <br />
                본 약관은 다양한 aEl MUSIC 서비스의 이용과 관련하여 aEl MUSIC 서비스를 제공하는 aEl 주식회사
                (이하'aEl')와 이를 이용하려는 aEl MUSIC서비스 회원(이하 '회원') 또는 비회원과의 관계를 설명하여,
                아울러 여러분의 aEl MUSIC서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                </p>
                <input checked={twoCheck} type="checkbox" name="2" onClick={twoRadio}/><span>개인정보 수집 및 이용동의(필수)</span>
                <p>개인정보보호법에 따라 aEL MUSIC에 회원가입 신청하시는 분께 수집하는 
                    개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간,
                    동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후
                    동의하여 주시기 바랍니다.
                </p>
                <input type="checkbox" name="3"/> <span>위치기반 서비스 이용약관 동의(선택)</span>
                <p>위치기반서비스 이용약관에 동의하시면, 위치를 활용한 광고 정보 수신 등을 포함하는
                    aEL MUSIC 위치기반 서비스를 이용할 수 있습니다.
                </p>
                <input type="checkbox" name="4"/><span>프로모션 정보 수신 동의(선택)</span>
                <p>aEL MUSIC에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화,
                    이메일로 받아보실 수 있습니다. 일부 서비스(별도 회원 체계로 운영하거나
                    aEL MUSIC 가입 이후 추가 가입하여 이용하는 서비스 등)의 경우, 개별 서비스에
                    대해 별도 수신 동의 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고
                    동의를 받습니다.
                </p>
            </div>
            <div className="btn">
                <Link to="/">
                    <input type="button" className="cancleBtn" value={'취소'}/>
                </Link>
                {/* 조건이 만족하면 버튼이 활성화 되어 다음 페이지로 넘어감 */}
                <Link to="/SignUp">
                    <input disabled={!oneCheck || !twoCheck} type="button" className="comfirmBtn" value={'확인'}/>
                </Link> 
            </div>
            </Inercontainer>
        </Container>
    );
};


export default Agreement;