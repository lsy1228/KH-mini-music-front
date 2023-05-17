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
        width: 500px;
        font-size: 30px;
        font-weight:bolder;
    }

    .artist{
        width: 200px;
        font-weight: bolder;
    }

    .minute{
        width: 100px;
    }

    .play{
        color: white;
        font-size: 25px;
        background-color : rgba(0,0,0,0);
        border: none;
        margin-right: 50px;
    }

    .stop{
        font-size: 30px;
    }

    .more{
        width: 100px;
        text-align: center;
        font-size: 40px;
    }
    .heart {
        color: white;
        font-size: 1.7rem;
        margin-right: 65px;
    }
`;


const TOP100=()=>{
    const context = useContext(UserContext);
    const {playing, setPlaying, setChart, chart ,playingIndex, setPlayingIndex, currentSong, setCurrentSong, Audio, setTitle, setArtist, setPlayImg} = context;


    const[clicked, setClicked] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        const chartSong = async() => {
            const rsp = await AxiosMini.songChart("ALL");
            if(rsp.status === 200) setChart(rsp.data);
        };
        chartSong();
    }, []);
    
    const clickHeart = async(index) =>{
        if(clicked.includes(index)) { // clicked 배열에 현재 index가 포함되어 있는지 확인, 포함되어 있으면 클릭된 상태
            setClicked(clicked.filter((item)=> item !==index)); // 클릭이 된 경우, 클릭 취소
        } else {    // 클릭되지 않은 경우
            const value = window.localStorage.getItem("isLoginSuv");
            if(value === "FALSE") {
                navigate("/LoginPage");
            } else {
            const id = window.localStorage.getItem("userIdSuv");
            console.log(id);
            setClicked([...clicked, index]); // cliked 배열에 추가
        }
        }
    }


    const playPause = (index) => {
        if(playing && playingIndex === index) { // 현재 재생중이고 인덱스가 같으면
            setPlaying(false);
            Audio.current.pause();  // 곡을 멈춤
            setPlayingIndex(-1);    // 재생 중인 곡의 인덱스를 -1로 변경
            setTitle(chart[index].title);
            setArtist(chart[index].artist);
            setPlayImg(chart[index].cover_url);
        } else {
            setPlaying(true);
            setPlayingIndex(index);     // 재생 중인 곡의 인덱스를 변경
            Audio.current.src = chart[index].song_url;  // audio의 src를 해당 곡의 url로 변경
            Audio.current.play();   // 곡 재생
            setTitle(chart[index].title);
            setArtist(chart[index].artist);
            setPlayImg(chart[index].cover_url);
        };
    };

    const onPlaying = () => {
        const duration = Audio.current.duration;    // 노래의 전체길이
        const ct = Audio.current.currentTime;       // 노래의 현재 재생 시간
        setCurrentSong({...currentSong, "progress" : ct / duration * 100, "length":duration});
    };


    return(
        <Body>
        {chart && chart.map((x, index) => (
        <Container_in key={x.id}>
            <div className="ranking">{index+1}</div>    
            <img src={x.cover_url}/>
            <div className="TITLE">{x.title}</div>      
            <div className="artist">{x.artist }</div>
            {clicked.includes(index) ?<BsHeartFill className="heart FULL" onClick={()=>clickHeart(index, x.songId)}/> : <BsHeart className="heart" onClick={()=>clickHeart(index, x.songId)}/>}
            {playing && playingIndex === index ? <FaPause className="play" onClick={()=>playPause(index)}/> : <FaPlay className="play" onClick={()=>playPause(index)}/>}
            <audio ref={Audio} onTimeUpdate={onPlaying}/>         
        </Container_in>
        ))}
    </Body>
    );
};
export default TOP100;
