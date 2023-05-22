import { useContext, useEffect } from "react";
import styled from "styled-components";
import AxiosMini from "../api/AxiosMini";
import {FaPlay, FaPause} from 'react-icons/fa';
import { UserContext } from "../context/UserInfo";
import { useState } from "react";


const Body = styled.div`
    margin: 0;
    padding: 0;
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background-color: black;
    position: fixed;
`;

const Container = styled.div`
     margin: 8px 18px 8px 8px;
        width: 100%;
        height: 100px;
        border-radius: 20px;
        background-color: rgba(255,255,255,0);
        /* background-color: aliceblue; */
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



const Info = () =>{
    const context = useContext(UserContext);
    const {playing, setPlaying, setChart, chart ,playingIndex, setPlayingIndex, currentSong, setCurrentSong, Audio, setTitle, setArtist, setPlayImg, allPlay, randomPlay} = context;
    const [playlist, setPlayList] = useState([]);

    const value = window.localStorage.getItem("isLoginSuv");
    const id = window.localStorage.getItem("userIdSuv");

    

    useEffect (()=> {
        if(value === "FALSE") {

        }
        const playlist = async() => {
            const rsp = await AxiosMini.myPlaylist(id);
            if(rsp.status === 200) setPlayList(rsp.data);
            console.log(rsp.data);
        };
        playlist();
    }, []);

    const playPause = (index) => {
        console.log(playlist.length);
        console.log(index);
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
            Audio.current.src = playlist[index].song_url;  // audio의 src를 해당 곡의 url로 변경
            Audio.current.play();   // 곡 재생
            setTitle(playlist[index].title);
            setArtist(playlist[index].artist);
            setPlayImg(playlist[index].cover_url);
            }
        };
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
            Audio.current.src = playlist[nextIndex].song_url;
            Audio.current.play();
            setTitle(playlist[nextIndex].title);
            setArtist(playlist[nextIndex].artist);
            setPlayImg(playlist[nextIndex].cover_url);
        }

    return(
            <Body>
                {playlist && playlist.map((x, index)=> (
                <Container key = {x.id}>
                    <div className="number">{index+1}</div>
                    <img src={x.cover_url}/>
                    <div className="title">{x.title}</div>
                    <div className="artist">{x.artist}</div>
                    {playing && playingIndex === index ? <FaPause className="play" onClick={()=>playPause(index)}/> : <FaPlay className="play" onClick={()=>playPause(index)} />}
                    <audio ref={Audio} onTimeUpdate={onPlaying} onEnded={handleAudio} />
                </Container>
                ))}
    
            </Body>  
    );
}


export default Info;