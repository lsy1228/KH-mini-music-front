import React from "react";
import styled from "styled-components";
import Logo from "../image/로고.png";
import { useState , useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import AxiosApi from "../api/AxiosMini";
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
        display: right;
        text-align: right;
        margin: 0 0 9px 0;
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
    }
`;


const LoginPage =()=>{
 
    //네비게이트를 설정하여 다시 home화면으로 돌아갈 수 있게 한다.
    const navigate = useNavigate();
    //Context API에 값을 저장한다.
    const context = useContext(UserContext);
    const {setUserId, setPassword,setIsLogin } = context;   
    //id와 pw를 입력받는다.
    const [inputId,setInputId] = useState("");    
    const [inputPw,setInputPw] = useState("");
    //팝업을 띄울 Modal 을 설정한다.
    const [modalOpen,setModalOpen] = useState(false);
   
  
    window.localStorage.setItem("isLoginSuv", "FALSE");   // 로그인 여부 저장
    window.localStorage.setItem("userIdSuv", "");         // 사용자ID저장, 빈 문자열을 전달하여 사용자 ID 초기화
    
    const closeModal = () =>{
      setModalOpen(false);
    };
     //input창에서 id를 받아옴.
     const onChangeId = e => {
        setInputId(e.target.value);
    };
    //input창에서 pw를 받아옴.
    const onChangePw = (e) => {
        setInputPw(e.target.value)
    };
    

    //onClick시 실행
    const onClickLogin = async() =>{ 
        // 로그인을 위해 axios 호출 JAVA를 통해 DB를 갔다온다.
        const response = await AxiosApi.memberLogin(inputId,inputPw);

        if(response.data===true){
            //들어온 id,pw 를 ContextApi에 저장.
            setUserId(inputId);
            setPassword(inputPw);
            //로그인시 유저아이디와 로그인여부에 값을 바꿔준다.
            window.localStorage.setItem("isLoginSuv", "TRUE");
            window.localStorage.setItem("userIdSuv", inputId);
            //로그인 성공시 home화면으로 돌아간다.
            navigate ("/");
        } else {
            console.log("로그인 에러");
            setModalOpen(true);
        }
    };
 




    

    return(  
        <Body>
            <Container_body>
                <Link to="/"><img src={Logo} style={{width:"180px"}}/></Link>
                <Container></Container>
                <Input placeholder="ID" value ={inputId} onChange={onChangeId}/>
                <Container></Container>
                <Input placeholder="Password" type="password" value ={inputPw} onChange={onChangePw}/>
                <Container></Container>
                <Button  onClick={onClickLogin} >LOGIN</Button>
                <Container></Container>
                <Container>
                <a href="#" className="findIdPW">forgot your ID /Password</a>
                <a href="#" className="findIdPW"><Link to="/">Home</Link></a>
                </Container>
                <Modal open={modalOpen} type={true}  close={closeModal} header="오류">아이디 및 패스워드를 재확인 하세요.</Modal>
                <a href="agreement"><Button>JOIN</Button></a>
            </Container_body>
        </Body>
    );
};



export default LoginPage;
