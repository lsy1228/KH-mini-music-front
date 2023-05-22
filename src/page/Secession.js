import React from "react";
import styled from "styled-components";
import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosMini";
import { UserContext } from "../context/UserInfo";



const Body = styled.div`
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
    min-width: 400px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 650px);
`;


const Container_body = styled.div`
    width: 375px;
    height: 650px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 120%;
    color:  white;

    .infoPage{
        width: 300px;
        font-size: 12px;
    }
    
    .selecPage{
        font-size: 13px;
        font-weight: bolder;
        line-height: 90%;
    }

    .select{
        width: 300px;
        height: 25px;
        border-radius: 5px;
    }
`;


const Container = styled.div`
    width: 300px;
    height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #BB2649;
    span{
        color: white;
        font-size: 12px;
        text-decoration: none;
    }
`;


const Input = styled.input`
    background-color: #BB2649;
    color: white;
    width: 300px;
    height: 50px;
    border-radius:10px;
    font-size: 15px;
    border: 0px;
    &:focus {
        outline: 0.5px solid white;
    }
    &::placeholder {
        color: rgba(255,255,255,0.7);
        font-size: 12px;
    }
`;


const DisableButton = styled.button`
    width: 300px;
    height: 50px;
    border: 2px solid rgba(255,255,255,0);
    border-radius: 10px;
    color: #BB2649;
    font-size:15px;
    :disabled{
        background-color: rgba(50,50,50);
    }
`;


const AbleButton = styled.button`
    width: 300px;
    height: 50px;
    border: 2px solid rgba(255,255,255,0);
    border-radius: 10px;
    color: #BB2649;
    font-size:15px;
    background-color:rgb(255,255,255) ;
    &:hover{
        border: 2px solid #BB2649;
    }
    :disabled{
        background-color: #CCC;
    }
`



const Secession =()=>{
    const navigate = useNavigate();
    //Context Api를 통해서 입력한 password값을 불러온다.
    const context = useContext(UserContext);
    const {userId,password} = context;
    //패스워드 입력창에서 입력된 값을 가져온다.
    const [inputPw,setInputPw] = useState("");
    //input창에서 pw를 받아옴. 
    //컴플리트 창을 활성화 시킬 변수. 상수 말고 변수로 선언해주어야 한다.
    const [changePw,setChange] = useState("FALSE");
    const onChangePw = (e) => {
        setInputPw(e.target.value);
        console.log(inputPw);
        console.log(password);
        //들어온 input값과 password가 같으면 TRUE로 바꿔준다.
        //setChange보다 e값을 직접 가져와서 비교해야한다.
        if(password === e.target.value) setChange("TRUE");
        else setChange("FALSE");
    };

    //탈퇴
    const onClickSec= async() =>{
        const response = await AxiosApi.memberSec(userId,inputPw);        
        if(response.data===true){
                console.log("탈퇴 성공");
                //탈퇴 후 메인화면으로 돌아간다.
                window.localStorage.setItem("isLoginSuv", "FALSE"); 
                navigate("/");
                //탈퇴 후 새로고침 되어지게 한다.
                window.location.reload("/");
        }
    };
   
    
    return(  
        <Body>
            <Container_body>
                <div className="sespge">
                    <h2>SECESSION PAGE</h2>
                </div>
                <div className="infoPage">
                    <h3>회원탈퇴 안내</h3>
                    고객님 께서 회원 탈퇴를 원하신다니 저희 서비스가 많이 
                    부족하고 미흡했나 봅니다. 불편하셧던 점이나 불만 사항을 알려주시면 
                    적극반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.
                    <p/>
                    <h4>아울러 회원 탈퇴시의 아래 사항을 숙지하시기 바랍니다.</h4><p/>
                    1. 회원탈퇴시 고객님의 정보는 소비자 보호에 관한 법률에 의거한 고객 정보보호 정책에 따라 관리됩니다.<br/>
                    2. 탈퇴시 고객님께서 보유하신 등급은 모두 삭제 됩니다.<br/>
                    3. 회원 탈퇴 후 30일간 재가입이 불가능합니다.<p/>

                    *비밀번호 입력 시 회원이 탈퇴됩니다.
                </div>
                <Container></Container>
                <Input placeholder="Password" type="password" value ={inputPw} onChange={onChangePw}/>                
                <Container></Container>
                <div className="selecPage">
                    <span>무엇이 불편하셨나요?</span><p/>
                    <select className="select">                        
                        <option value="sel1">선택하지 않음</option>
                        <option value="sel2">노래가 별로 없음</option>
                        <option value="sel3">단순 변심</option>
                        <option value="sel4">타 사이트 이용</option>
                    </select>
                </div>
                <Container></Container>
                {changePw === "FALSE" && <DisableButton disabled>패스워드를 입력하세요</DisableButton>}                
                {changePw === "TRUE" && <AbleButton onClick={onClickSec}>COMPLETE</AbleButton>}
                <Container></Container>
            </Container_body>
        </Body>

    );
};


export default Secession;