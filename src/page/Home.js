import React, { useState, useContext } from "react";
import styled, {css} from "styled-components";
import logo from "../image/로고.png"
import { AiOutlineUser } from "react-icons/ai";
import Playlist from "./Playlist"
import Info from "./Info";
import Today from "./Today";
import Chart from "./Chart";
import MyPage from "./MyPage";
import { UserContext } from "../context/UserInfo";
import { Link } from "react-router-dom";
import AxiosApi from "../api/AxiosMini";
import Player from "./PlayList/Player";
import MusicInfo from "./MusicInfo";
import MemberShip from "./MemberShip";
import Secession from "./Secession";






const ContainerWhole=styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    height: calc(100vh - 50px);
    margin: 0;
    padding: 0;
    display: flex;
    background-color: #BB2649;
    width: 100%;
`; 


// 사이드 바 
const Side = styled.div`
    width: 300px; 
    height: calc(100vh - 50px);
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    background-color: rgb(0, 0, 0, 0.80);

    a{
      width: 150px;
      height: 150px; 
    }

    img{
      width: 150px;
      height: 150px;
      margin-left: 50%;
    }
`;

// 로그인 영역
const Logindiv = styled.div`
    width: 300px;
    height: 140px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    color: white;

  .LoginBtn{
      width: 300px;
      height: 70px;
      color:white;
      text-decoration: none;
      font-size: 18px;
      font-weight:bolder;
      letter-spacing: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover{
          color: #BB2649;
          background-color: black;
      }
    } 
`;

// 노래 검색 영역
const SearchBox = styled.div`
    width: 300px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon{
      margin-left: 20px;
      margin-top: 10px;
    }
`;

// 노래 검색 창
const SearchInput = styled.input`
    border-radius: 30px;
    width: 190px;
    height: 30px;
    text-align: center;
    border: none;
`;

// 안내 영역
const Ulb = styled.ul`
    flex-direction: column;
    color: white;
    list-style: none;
`;

// 안내 세부 영역
const Lib = styled.li`
    margin-left: 10%;
    font-size: 15PX;
    color: white;
    list-style: none; 
    letter-spacing: 20px;
    margin-bottom: 20px;
`;

// 사이드메뉴 버튼 스타일
const Button = styled.button`
    width: 300px;
    height: 90px;
    min-height: 40PX;
    background-color: rgb(0,0,0, .0);
    font-size: 18px;
    font-weight: bold;
    color: white;
    border: none;

    &:hover{
          font-weight: bold;
          background-color: black;
          color: #BB2649;
          width: 300px;
    }
      ${props => props.active && css`   // *&* props가 active이면 css를 재정의 한다.
          background-color: black;
          color: #BB2649;
          width: 100%;
        `}
`; 


const Mainbody = styled.div`

`;


// 음악 재생 바 
const PlayBar = styled.div`
    width: 100%;
    height: 100%;
    .album{
      width: 50px;
    }
    .list{
      margin-top: 5px;
      color: white;
  }
`;

// 로그아웃 
const LogOut=styled.div`
    font-size: 12px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255,255, 0.5);
    width: 80px;
    cursor: pointer;

    &:hover{
      color: red;
    }
`;



const Sidemenu = [
  //버튼을 카테고리로 분류하여 값을 쉽게 가져오기 위해 name으로 설정한다.
  { name : "Today"},
  { name : "차트"},
  { name : "이달의 정보"},
  { name : "추천플레이리스트"}
]


const MyInfo = [
  //버튼을 카테고리로 분류하여 값을 쉽게 가져오기 위해 name으로 설정한다.
  { name : "마이페이지"}
]


const Home =() => { 
    //Context에서 값 읽기 
    const context = useContext(UserContext);
    const {isLogin, setIsLogin, setSongTitle, setSongArtist, setAlbumName, setLyrics, setCoverUrl, songUrl, setPlaying, setSongUrl} = context;
   
  
 
    //버튼의 선택을 통해서 버튼의 값을 가져온다.
    const[changeSide, setChangeSide] = useState("");
    const[sidemenu, setSidemenu] = useState("all"); 
    
  

    //onClick을 통해서 가져온 값을 해당하는 구역에 기입 한다. 
    const onSelect = q =>{
      //side메뉴를 순회할 useState
      setChangeSide(q);
      //css를 재정의 할 useState
      setSidemenu(q); 
    };
     
    


    // 로그인 여부 확인 
    const isLoginStr = window.localStorage.getItem("isLoginSuv");
      if(isLoginStr==="TRUE"){
        setIsLogin("TRUE");
      }else{
      setIsLogin("FALSE");
      };
  
    //노래를 검색해서 콘솔로 url 출력
    const [inputSongName,setInPutSongName] =useState("");


    //엔터키를 눌러야 onFindSong이 실행되게 한다.
    const onEnter=(e)=>{
      if(e.key==='Enter'){
        onFindSong();
        setChangeSide("Enter");
        setPlaying(false); 
      }; 
    }; 

    //비동기 통신으로 받아온 노래 이름과 아티스트 이름으로 URL을 검색한다.
    const onFindSong=async()=>{
      const songFind = await AxiosApi.songFind(inputSongName);
      setCoverUrl(songFind.data[0].cover_url);
      setAlbumName(songFind.data[0].albumName);
      setSongArtist(songFind.data[0].artist);
      setSongTitle(songFind.data[0].title);
      setLyrics(songFind.data[0].lyrics);
      setSongUrl(songFind.data[0].song_url); 
    };


    //노래 이름을 검색
    const onChangeSong =e=>{
      setInPutSongName(e.target.value);
    }; 


    // 로그아웃 
    const onLogOut=()=>{
      window.localStorage.setItem("userIdSuv", "");
      window.localStorage.setItem("isLoginSuv", "FALSE"); 
      window.location.replace("/");
    };

    //자식 페이지에서 바뀌는 값을 그대로 가져온다.
    const cPage = (e) => {
      setChangeSide(e);
    };


    return(
      <ContainerWhole>
        <Container>
          <Side>
           <a href="/"> <img src={logo} alt=""/></a>
              <Logindiv>  
              {isLogin==="FALSE" && <Link to="/Loginpage" className="LoginBtn"><AiOutlineUser/>로그인</Link>}
                {MyInfo.map(l=>(
                    isLogin ==="TRUE" && 
                    <Button to="/Mypage" className="LoginBtn"  key={l.name}  onClick={()=>setChangeSide(l.name)} > 
                       {l.name}
                    </Button>
                    ))}
                <SearchBox>
                  <SearchInput type="text" placeholder="노래 검색" 
                    onKeyDown={onEnter} value={inputSongName} onChange={onChangeSong}/>
                </SearchBox>
              </Logindiv>
                {Sidemenu.map( s=>(  // Sidemenu 요소를 순회하면서,  onClick 클릭 시 onSelect 함수를 호출하여 화면 상태 변경 
                                     // active={sidemenu === s.name} 에서 선택되어진 s.name 값은 CSS에서 props로 재정이 되어진다.
                  <Button key={s.name} active={sidemenu === s.name} onClick={()=>onSelect(s.name)}>
                      {s.name}
                  </Button>
                ))}
              <Ulb> 
                  <Lib>멤버쉽안내</Lib>
                  <Lib>고객센터</Lib>
              </Ulb>
                <div>
                    {isLogin==="FALSE"}
                    {isLogin==="TRUE" && <LogOut onClick={onLogOut}>로그아웃</LogOut>}
                </div>
          </Side> 
          <Mainbody>  
                {changeSide === "" && <Today/>} 
                {changeSide === "마이페이지" && <MyPage changePage={cPage}/>}
                {changeSide === "Today" && <Today/>}    
                {changeSide === "차트" && <Chart/>}      
                {changeSide === "이달의 정보" && <Info/>}  
                {changeSide === "추천플레이리스트" && <Playlist/>}     
                {changeSide === "Enter" && <MusicInfo/>} 
                {changeSide === "맴버십" && <MemberShip/>} 
                {changeSide === "회원탈퇴" && <Secession/>} 
          </Mainbody>
        </Container>    
              <PlayBar>
                 <Player  />
              </PlayBar>
      </ContainerWhole>
    );
};



export default Home;