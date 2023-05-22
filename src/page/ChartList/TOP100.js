import React, { useContext, useEffect , useState } from "react";
import styled from "styled-components";
import AxiosMini from "../../api/AxiosMini";
import {FaPlay, FaPause} from 'react-icons/fa';
import { UserContext } from "../../context/UserInfo";
import {BsHeart, BsHeartFill} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

const Body = styled.div`
        margin: 0;
        padding: 0;
        width: 100%;
        height: calc(100vh - 330px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow-y: scroll;
        flex-wrap: wrap;
        background-color: black;
        -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Container_in = styled.div`
        margin: 8px 18px 8px 8px;
        width: 100%;
        height: 150px;
        border-radius: 20px;
        background-color: rgba(255,255,255,0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        color: white;
        transition: ease 0.4s;
    &:hover{
        background-color: #BB2649;
        color: black;
    }

    .ranking{
        margin: 0 0 0 30px;
        font-size: 20px;
    }

    img{
        margin: 0 17px 0 17px;
        width: 120px;
        height: 120px;
        background-color: #BB2649;
        border-radius: 15px;
        display: block;
    }
    .TITLE{
        min-width: 200px;
        width: 500px;
        font-size: 30px;
        font-weight:bolder;
    }

    .artist{
        min-width: 150px;
        width: 200px;
        font-weight: bolder;
    }

    .play{
        min-width: 25px;
        color: white;
        font-size: 25px;
        background-color : rgba(0,0,0,0);
        border: none;
        margin-right: 50px;
    }

    .stop{
        font-size: 30px;
    }

    .heart {
        min-width: 25px;
        color: white;
        font-size: 1.7rem;
        margin-right: 65px;
    }
    .FULL {
        color : rgb(255,19,80);
    }
`;


const TOP100=()=>{
    const context = useContext(UserContext);
    const {playing, setPlaying, setChart, chart ,playingIndex, setPlayingIndex, currentSong, setCurrentSong, Audio, setTitle, setArtist, setPlayImg, allPlay, randomPlay} = context;

    const[clicked, setClicked] = useState([]);
    const id = window.localStorage.getItem("userIdSuv"); // 로컬 스토리지로 아이디를 가져옴
    const value = window.localStorage.getItem("isLoginSuv");    // 로그인 여부
    const navigate = useNavigate();

    useEffect(()=> {
        if(value === "FALSE") {
            setClicked([]);
        }
        const chartSong = async() => {
            const rsp = await AxiosMini.songChart(id);
            if(rsp.status === 200) setChart(rsp.data);
        };
        chartSong();

    }, [clicked]);
    
    const clickHeart = async(userId, songId) =>{
            if(value === "FALSE") {
                navigate("/LoginPage");
            } else {
            setClicked([...clicked, userId,songId]); // cliked 배열에 추가
            const songLike = await AxiosMini.songLike(id, songId);      // like 테이블에 insert
            console.log(songLike);
        }
        }

    const clickHeartFull = async(userId, songId) => {
        const songdelete = await AxiosMini.songLikeDelete(id, songId);
        console.log(songdelete);
        setClicked([...clicked, userId, songId]);
    }



    const playPause = (index) => {
        if(playing && playingIndex === index) { // 현재 재생중이고 인덱스가 같으면
            setPlaying(false);
            Audio.current.pause();  // 곡을 멈춤
        } else {        // 재생중이 아니면
            setPlaying(true);
            setPlayingIndex(index);     // 재생 중인 곡의 인덱스를 변경
            if(playingIndex === index) {
                setPlaying(true);
                Audio.current.play();
            } else {
            Audio.current.src = chart[index].song_url;  // audio의 src를 해당 곡의 url로 변경
            Audio.current.play();   // 곡 재생
            setTitle(chart[index].title);
            setArtist(chart[index].artist);
            setPlayImg(chart[index].cover_url);
            }
        };
    };

     // onEnded : 오디오 재생이 끝나면 실행할 함수 지정
     const handleAudio = () => {
        setPlaying(false);      // 재생상태 false로 변경
        setPlayingIndex(-1);    
        setTitle("");
        setArtist("");
        setPlayImg("");

        if(allPlay === true) {
            const nextIndex = playingIndex + 1;     // 다음곡 자동재생
            setPlaying(true);
            setPlayingIndex(nextIndex);
            Audio.current.src = chart[nextIndex].song_url;
            Audio.current.play();
            setTitle(chart[nextIndex].title);
            setArtist(chart[nextIndex].artist);
            setPlayImg(chart[nextIndex].cover_url);
          }
          if(randomPlay === true) {
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

     // onTimeUpdate : 오디오 재생 시간이 업데이트 될 때마다 실행할 함수를 지정, 오디오 재생 중에 시간이 업데이트 될 때마다 해당 함수 호출
     const onPlaying = () => {
        const duration = Audio.current.duration;    // 노래의 전체길이
        const ct = Audio.current.currentTime;       // 노래의 현재 재생 시간
        // currentSong 업데이트, "progress" : 노래의 현재 진행상황, "length" : 노래의 전체 길이
        setCurrentSong({...currentSong, "progress" : ct / duration * 100, "length":duration});
    }

    return(
        <Body>
        {chart && chart.map((x, index) => (
        <Container_in key={x.id}>
            <div className="ranking">{index+1}</div>    
            <img src={x.cover_url}/>
            <div className="TITLE">{x.title}</div>      
            <div className="artist">{x.artist}</div>
            {x.user_id !== null ?<BsHeartFill className="heart FULL" onClick={()=>clickHeartFull(x.user_id, x.songId)}/> : <BsHeart className="heart" onClick={()=>clickHeart(x.user_id, x.songId)}/>}
            {playing && playingIndex === index ? <FaPause className="play" onClick={()=>playPause(index)}/> : <FaPlay className="play" onClick={()=>playPause(index)}/>}
            <audio ref={Audio} onTimeUpdate={onPlaying} onEnded={handleAudio}/>         
        </Container_in>
        ))}
    </Body>
    );
};


export default TOP100;