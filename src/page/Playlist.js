import { useContext, useEffect } from "react";
import styled from "styled-components";
import AxiosMini from "../api/AxiosMini";
import {FaPlay, FaPause} from 'react-icons/fa';
import { UserContext } from "../context/UserInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Body = styled.div`
    margin: 0;
    padding: 0;
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
    display: flex;
    /* border: 1px solid white; */
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background-color: black;
    position: fixed;
    
`;

const Inner = styled.div`
    margin: 0;
    padding: 0;
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
    overflow-y: scroll;

`

const Container = styled.div`
/* border: 1px solid white; */
     margin: 10px 18px 8px 18px;
        width: 95%;
        height: 100px;
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
        width: 90px;
        height: 90px;
        background-color: #BB2649;
        border-radius: 15px;
        display: block;
    }
    .title{
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
    
`;



const Playlist = () =>{
    const context = useContext(UserContext);
    const {playing, setPlaying, setChart, chart,playingIndex, setPlayingIndex, currentSong, setCurrentSong, Audio, setTitle, setArtist, setPlayImg} = context;

    const value = window.localStorage.getItem("isLoginSuv");
    const id = window.localStorage.getItem("userIdSuv");
    const navigate = useNavigate();
    

    useEffect (()=> {
        if(value === "FALSE") {
            navigate("/LoginPage");
        }
        const playlist = async() => {
            const rsp = await AxiosMini.myPlaylist(id);
            if(rsp.status === 200) setChart(rsp.data);
            console.log(rsp.data);
        };
        playlist();
    }, []);

    const playPause = (index) => {
        if(playing && playingIndex === index) { // 현재 재생중이고 인덱스가 같으면
            setPlaying(false);
            Audio.current.pause();  // 곡을 멈춤
        } else {        // 재생중이 아니면
            setPlaying(true);
            setPlayingIndex(index);     // 재생 중인 곡의 인덱스를 변경   
            setTitle(chart[index].title);
            setArtist(chart[index].artist);
            setPlayImg(chart[index].cover_url);
            Audio.current.src = chart[index].song_url;  // audio의 src를 해당 곡의 url로 변경           
            Audio.current.play();   // 곡 재생
        }
    };


    const onPlaying = () => {
        const duration = Audio.current.duration;    // 노래의 전체길이
        const ct = Audio.current.currentTime;       // 노래의 현재 재생 시간
        // currentSong 업데이트, "progress" : 노래의 현재 진행상황, "length" : 노래의 전체 길이
        setCurrentSong({...currentSong, "progress" : ct / duration * 100, "length":duration});
    }

    const handleAudio = () => {
            const nextIndex = playingIndex + 1;     // 다음곡 자동재생
            setPlaying(true);
            setPlayingIndex(nextIndex);
            if(nextIndex === chart.length) { // 다음 노래 인덱스가 차트의 길이와 같은 경우
                setPlayingIndex(0);          // 재생 인덱스를 0으로 설정
            }
            Audio.current.src = chart[nextIndex % chart.length].song_url;
            Audio.current.play();
            setTitle(chart[nextIndex % chart.length].title);
            setArtist(chart[nextIndex % chart.length].artist);
            setPlayImg(chart[nextIndex % chart.length].cover_url);
        }

    return(
            <Body>
                <Inner>
                    {chart && chart.map((x, index)=> (
                    <Container key = {x.id}>
                        <div className="number">{index+1}</div>
                        <img src={x.cover_url}/>
                        <div className="title">{x.title}</div>
                        <div className="artist">{x.artist}</div>
                        {playing && playingIndex === index ? <FaPause className="play" onClick={()=>playPause(index)}/> : <FaPlay className="play" onClick={()=>playPause(index)} />}
                        <audio ref={Audio} onTimeUpdate={onPlaying} onEnded={handleAudio} />
                    </Container>
                    ))}
                </Inner>
            </Body>  
    );
}


export default Playlist;