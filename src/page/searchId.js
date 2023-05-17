import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../image/로고.png";
import AxiosApi from 'axios';
import Modal from "../util/Modal";
import { UserContext } from "../context/UserInfo";


const Body = styled.div`
    position:absolute;
    float: left;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 650px);
`;


const Container_body = styled.div`
    width: 375px;
    height: 500px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 300px;
    height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #BB2649;
    a{
        color: white;
        font-size: 12px;
        text-decoration: none;
        
    }
`; 


const Input = styled.input`
    padding: 3px;
    background-color: #BB2649;
    color: white;
    width: 300px;
    height: 50px;
    border-radius:10px;
    font-size: 15px;
    border: 0px;
    &:focus {outline: 0.5px solid white;}
    &::placeholder {
        padding: 5px;
        color: rgba(255,255,255,0.7);
        font-size: 12px;
    };
`;


const Button = styled.button`
    width: 300px;
    height: 50px;
    border: 2px solid rgba(255,255,255,0);
    border-radius: 10px;
    color: #BB2649;
    font-size:15px;
    background-color:rgb(255,255,255) ;
    &:hover{
        border: 2px solid #BB2649;
        background-color: #BB2649;
        color: rgb(255,255,255);
    }
`;



const SearchId = () =>{
        
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [modalOpen,setModalOpen] = useState(false);
    const context = useContext(UserContext);
    const {setUserName, setEmail } = context;   

     //Context API에 값을 저장한다.
   
  
  
  
      
   
    
    const closeModal = () =>{
        setModalOpen(false);
      };

    const handleNameChange = (e) => {
        setInputName(e.target.value);
      };
    
      const handleEmailChange = (e) => {
        setInputEmail(e.target.value);
      };



 

      const handleSearchId = async() =>{ 
        // 이름, 이메일 확인을 위해 axios 호출 JAVA를 통해 DB를 갔다온다.
        const response = await AxiosApi.memberGet(inputName,inputEmail);

        if (response === true) {
            setUserName(inputName);
            setEmail(inputEmail);
          } else {
            console.log('로그인 에러');
            setModalOpen(true);
          }
    };


    return(
        <Body>
            <Container_body>
                <Link to="/"><img src={Logo} style={{width:"180px"}}/></Link>
                <Container></Container>
                <Input placeholder="이름" value={inputName} onChange={handleNameChange}  />
                <Container></Container>
                <Input placeholder="Email" type="Email"  value={inputEmail} onChange={handleEmailChange}   />
                <Container></Container>
                <Modal open={modalOpen} type={true}  close={closeModal} header="오류">아이디 및 패스워드를 재확인 하세요.</Modal>
                <Button onClick={handleSearchId}>아이디찾기</Button>
                <Container></Container>
                <Container>
                <a href="LoginPage" className="findIdPW">Login으로 이동</a>
                </Container>
            </Container_body> 
        </Body>  
    );
}


export default SearchId;