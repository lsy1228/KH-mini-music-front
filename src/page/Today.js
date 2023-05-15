import styled, {css} from "styled-components";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserInfo";
import NewAlbum from "./TodayList/NewAlbum";
import NewInfo from "./TodayList/NewInfo";
import NewMv from "./TodayList/NewMv";




const Body = styled.div`
    margin: 0;
    padding: 0;
    width: calc(100vw - 300px); // 전체 너비에서 사이드메뉴 영역인 300px를 빼준 후 나머지 영역에 화면을 보여줌
    min-width: 400px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background-color: black;
    position: fixed;
`;


const BackHead=styled.div`
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    a{
        width: 100px;
        font-size: 12px;
        color: #BB2649;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight:bold;
    }

    .logTrue{
        width: 200px;
        font-size: 12px;
        color: #BB2649;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight:bold;
    }

    .logout{
        margin-left: 8px;
        font-size: 12px;
        border-radius: 10px;
        background-color: rgb(0,0,0, .0);
        color: #BB2649;
        font-weight: bolder;
        border: none;
        cursor: pointer;
    }
`;


const Head=styled.div`
    width: 100%;
    height: 90px;
    background-color: #BB2649;
    display: flex;
    justify-content: space-between;
`;


const Button= styled.button`
    width: 500px;
    border: none;    
    background-color: #BB2649;
    color:rgba(0,0,0,0.7);
    font-size: 25px;    
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: ease 0.3s;   
    &:hover{
        background-color: white;
        color: #BB2649;
        width: 50%;
        font-size: 29px;
        border: 2px solid white;
        border-radius: 20px;
    }

    ${props => props.active && css`    // *&* props가 active이면 css를 재정의 한다.
        background-color: white;
        color: #BB2649;
        width: 50%;
        font-size: 29px;
        border: 2px solid white;
        border-radius: 20px;

    `}

    & + &{
        margin-left: 3px;
    }
`;



const CHART = styled.div`
width: 100%;
margin: 0;
padding: 0;
.nowSelect{
    background-color: #BB2649;
    color: black;
    font-weight: bolder;
    font-size: 29px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;    
 
}
`;

const categories=[
    {
        name:"NEW ALBUM"
    },
    {
        name:"MAGAZINE"
    },
    {
        name:"M/V"
    }
];


const Today=()=>{
    //로컬스토리지 로그인 true false값을 통해 contextAPi값을 변경해준다.
    const isUserIdSrt = window.localStorage.getItem("userIdSuv");

    //Context에서 값 읽기 
    const context = useContext(UserContext);
    const {isLogin} = context;

    //버튼의 선택을 통해서 버튼의 값을 가져온다.
    const [topName,setTopName] = useState("");
    const [category,setCategory] = useState("all"); 
    const [changeB,setChange] = useState("");


    const onSelect = e =>{
        setTopName(e);
        setCategory(e);
        setChange(e);
    }    

    //로컬스토리지값을 지움으로써 로그아웃상태로 만든다.
    const onLogOut=()=>{
        window.localStorage.setItem("userIdSuv", "");
        window.localStorage.setItem("isLoginSuv", "FALSE");
        window.location.replace("/");
      };

    return(
        <Body>
            <BackHead>
                <a href="/"><Link to="/">HOME</Link></a>
                {isLogin==="FALSE" && <a href="#"><Link to="/Loginpage">LOGIN</Link></a>}
                {isLogin==="TRUE" && <a href="#" className="logTrue">반갑습니다 {isUserIdSrt}님<button className="logout" onClick={onLogOut}>로그아웃</button></a>}
            </BackHead>

            <Head>
            {categories.map(c=>(
                <Button key={c.name} active={category === c.name} onClick={()=>onSelect(c.name)}> 
                    {c.name}
                </Button>
            ))};
            </Head>
    
        
            <CHART>
                <div className="nowSelect">{topName}</div>
               {changeB === "" && <NewAlbum />}
               {changeB === "NEW ALBUM" && <NewAlbum/>}
               {changeB === "MAGAZINE" && <NewInfo/>}
               {changeB === "M/V" && <NewMv/>}
            </CHART>
        </Body>
    );
};

export default Today;



  
  
  
  
  

  
  
