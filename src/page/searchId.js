import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../image/로고.png";
import Modal from "../util/Modal";
import { UserContext } from "../context/UserInfo";
import AxiosMini from "../api/AxiosMini";


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
    // useState 이용하여 상태를 업데이트한다.
    const [inputName, setInputName] = useState(""); 
    const [inputEmail, setInputEmail] = useState("");
    const [modalOpen,setModalOpen] = useState(false);
    const [searchId, setSearchID] = useState("");

 
 
    // 모달 창 닫기 
    const closeModal = () =>{
        setModalOpen(false);
    };

    
    // inputName 업데이트
    const handleNameChange = (e) => {
        setInputName(e.target.value);
    };
    
    // inputEamil 업데이트
    const handleEmailChange = (e) => {
        setInputEmail(e.target.value);
    };

                             


    const handleSearchId = async() =>{ 
        // 비동기 요청을 통해 서버로 부터 ID 검색 요청 
        const response = await AxiosMini.searchId(inputName, inputEmail);   
        setSearchID(response.data[0].user_ID);  // 데이터에 저장된 ID를 가져와 searchId에 저장
        console.log(response.data[0].user_ID);
        setModalOpen(true);     // 모달 오픈 
    };


    return(
        <Body>
            <Container_body>
                <Link to="/"><img src={Logo} style={{width:"180px"}}/></Link>
                <Container></Container>
                <Input placeholder="이름" value={inputName} onChange={handleNameChange}  />
                <Container></Container>
                <Input placeholder="Email" type="email"  value={inputEmail} onChange={handleEmailChange}   />
                <Container></Container>
                <Button onClick={handleSearchId}>아이디찾기</Button>
                <Modal open={modalOpen} type={true}  close={closeModal} header="아이디찾기">{inputName}님의 아이디는{searchId} 입니다.</Modal>
                <Container></Container>
                <Container>
                <a href="LoginPage" className="findIdPW">Login으로 이동</a>
                <a href="SearchPw" className="findIdPW">비밀번호 찾기</a>
                </Container>
            </Container_body> 
        </Body>  
    );
};


export default SearchId;