import styled, {css} from "styled-components";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import TOP100 from "./ChartList/TOP100";
import UPRISING from "./ChartList/UPRISING";
import Abroad from "./ChartList/Aboard";
import Billboard100 from "./ChartList/Billboard100";
import { UserContext } from "../context/UserInfo";



const Body = styled.div`
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
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
    ${props => props.active && css` // *&* props가 active이면 css를 재정의 한다.
        background-color: white;
        color: #BB2649;
        width: 50%;
        font-size: 29px;
        border: 2px solid white;
        border-radius: 20px;

    `}
    & + &{ //현재 카테고리와 다음 카테고리 사이의 마진값을 부여한다.
        margin-left: 3px;
    }
`;



const Allplay = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 90px;

    div{
        color: white;
        font-size: 12px;
        width: 180px;
    }

    .allplay{
    width: 120px;
    height: 40px;
    margin: 0 10px 0 0 ;
    background-color: #BB2649;
    color: black;
    font-weight: bolder;
    border: none;
    border-radius: 5px;
}
    .rndplay {
    width: 120px;
    height: 40px;
    margin: 0 10px 0 0 ;
    background-color: #BB2649;
    color: black;
    font-weight: bolder;
    border: none;
    border-radius: 5px;

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

//버튼을 카테고리로 분류하여 값을 쉽게 가져오기 위해 name으로 설정한다.
const categories=[
    {
        name:"TOP100"
    },
    {
        name:"UPRISING"
    },
    {
        name:"Abroad"
    },
    {
        name:"Billboard100"
    }
]



const Chart=()=>{
   
    //ConText API를 통해서 저장된 id를 가져온다.
    const context = useContext(UserContext);
    const {isLogin, setIsLogin, setPlaying, chart ,playingIndex, setPlayingIndex, Audio, setTitle, setArtist, setPlayImg, setAllPlay, allPlay ,setRandomPlay, randomPlay} = context;


    //날짜를 설정하여 업데이트를 현시간으로 설정하게 한다.
    const now = new Date();
    //버튼의 선택을 통해서 버튼의 값을 가져온다.
    const [topName,setTopName] = useState("");
    const [category,setCategory] = useState("all"); //첫번쨰 default값은 all이다.
    const [changeB,setChange] = useState("");

    //onClick을 통해서 가져온 값을 해당하는 구역에 기입 한다. 
    const onSelect = e =>{
        setTopName(e);
        setCategory(e);
        setChange(e);
    };

    //설정한 날짜를 분해하여 가져온다.
    const nowDate=[{
            month:now.getMonth() + 1,
            day:now.getDate(),
            hour:now.getHours(),
            min:now.getMinutes()
        }];


   
    
    //로컬스토리지 로그인 true false값을 통해 contextAPi값을 변경해준다.
    const isLoginStr = window.localStorage.getItem("isLoginSuv");
    if(isLoginStr==="TRUE"){
        setIsLogin("TRUE");
    };

    //기존 ContextApi로 받아오던 {userId} 값 대신 {isUserIdSrt} 를 사용한다.
    const isUserIdSrt = window.localStorage.getItem("userIdSuv");
        const onClickLogout = () => {
            console.log("Logout 추가");
            window.localStorage.setItem("userIdSuv", "");
            window.localStorage.setItem("userPw", "");
            window.localStorage.setItem("isLogin", "FALSE");
            window.location.replace("/");
        };

    const allplay = () => {     // 모두 재생
        setAllPlay(!allPlay);
        if(allPlay === true) {      // 모두 재생이 true이면
            setPlaying(false);      // 재생상태 false
            Audio.current.pause();  // 노래 멈춤
            setPlayingIndex(-1);    
            setTitle("");
            setArtist("");
            setPlayImg(""); }
        else {
            const nextIndex = playingIndex + 1;     // playingIndex를 다음 노래 인덱스로 설정
            setPlaying(true);                       // 재생상태 true
            setPlayingIndex(nextIndex);             
            Audio.current.src = chart[nextIndex].song_url;
            Audio.current.play();
            setTitle(chart[nextIndex].title);
            setArtist(chart[nextIndex].artist);
            setPlayImg(chart[nextIndex].cover_url);
        }
    }

    const randomplay = () => {      // 랜덤 재생
        setAllPlay(false);
        setRandomPlay(!randomPlay);     
        if(randomPlay === true) {   // 랜덤 재생 true이면
            setPlaying(false);      // 재생상태 false로 변경
            Audio.current.pause();  // 노래 멈춤
            setPlayingIndex(-1);    
            setTitle("");
            setArtist("");
            setPlayImg("");
        } else {
        const randomInt = Math.floor(Math.random() * 10);   // 0 ~ 9까지의 랜덤 난수 생성
        setPlayingIndex(randomInt);                         // playingIndex를 랜덤 난수로 설정
        setPlaying(true);                                   
        Audio.current.src = chart[randomInt].song_url;
        Audio.current.play();
        setTitle(chart[randomInt].title);
        setArtist(chart[randomInt].artist);
        setPlayImg(chart[randomInt].cover_url);
        }
    }


    return(
        <Body>
            <BackHead>
                <a href="/"><Link to="/">HOME</Link></a>
                {isLogin==="FALSE" && <a href="#"><Link to="/Loginpage">LOGIN</Link></a>}
                {isLogin==="TRUE" && <a href="#" className="logTrue">반갑습니다 {isUserIdSrt}님<button className="logout" onClick={onClickLogout}>로그아웃</button></a>}
            </BackHead>
            
            <Head>
            {categories.map(c=>(
                // active 값을 여기서 비교하여 위의 *&* 값에 들어간다.
                <Button key={c.name} active={category === c.name} onClick={()=>onSelect(c.name)}> 
                    {c.name}
                </Button>
            ))}
            </Head>
        
            <Allplay>
                {nowDate.map(d=>
                    // 실시간으로 시간을 업데이트 한다.
                    (<div>ⓘ {d.month}월 {d.day}일 {d.hour}시 {d.min}분 업데이트</div>))}
                <button className="allplay" style={{backgroundColor : allPlay ? 'white' : '#BB2649' }} onClick={allplay}>ALL PLAY</button>
                <button className="rndplay" style={{backgroundColor : randomPlay ? 'white' : '#BB2649' }} onClick={randomplay}>RANDOM PLAY</button>
            </Allplay>
            
            <CHART>
                <div className="nowSelect">{topName}</div>
                {/* onClick으로 선택된 값이 changeB로 들어온다. */}
               {changeB === "" && <TOP100 />}
               {changeB === "TOP100" && <TOP100 />}
               {changeB === "UPRISING" && <UPRISING />}               
               {changeB === "Abroad" && <Abroad />}                         
               {changeB === "Billboard100" && <Billboard100 />}
            </CHART>
        </Body>
    );
};

export default Chart;