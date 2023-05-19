import React, { useContext, useRef} from "react";
import {BsFillPlayFill, BsFillPauseFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs'
import styled from "styled-components";
import { UserContext } from "../../context/UserInfo";

const PlayerContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: rgba(31, 31, 31, 1);

    .playTitle {
        display: flex;
        justify-content: center;
        color: white;
        width: 400px;
        font-weight: bolder;
        height: 30px;
    }

    img {
        width: 33px;
        height: 33px;
    }

    .navigation {
        width: 100%;
        display: flex;

        .navigation_wrapper {
            min-width: 100%;
            height: 3px;
            cursor: pointer;

            .seek_bar {
                width: 0;
                height: 100%;
                background-color: rgb(255, 19, 80);
            }
        }
    }

    .controls {
        width: 100%;
        font-size: inherit;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .btn {
            align-items: center;
            justify-content: center;
            display: flex;
            flex-grow:1;
        }

        .btn_action {
            font-size: 1.4rem;
            color: white;
            cursor: pointer;
            padding-bottom: 5px;
        }

        .btn_action_pp {
            font-size: 1.4rem;
            color: rgb(255, 19, 80);
            cursor: pointer;
            padding: 0 8% 5px 8%;
        }
    }
`;



const Player = () => {

    const context = useContext(UserContext);
    const {playing, setPlaying, setPlayingIndex,chart, playingIndex, currentSong, Audio, title, setTitle, artist, setArtist, playImg, setPlayImg} = context;
    const clickRef = useRef();
    

    const onClick = () => {
      
        setPlaying(!playing);   // 재생상태 설정
        if(playing === true) {  // 재생중이면
            Audio.current.pause();      // 노래 멈춤
        }
        else {                  // 재생중이 아니면
            Audio.current.play();       // 노래 재생
        }
    }
    const skipBack = () => {
        const index = playingIndex;     // 인덱스를 현재 재생중인 노래의 인덱스로 설정
        if(index == 0) {                // 제일 첫번째 곡일 경우
            setPlayingIndex(chart.length-1);    // 인덱스를 노래 데이터 가장 마지막 곡 인덱스로 설정
            setPlaying(true);   // 재생상태 변경
            Audio.current.src = chart[chart.length-1].song_url;    // audio의 src를 마지막곡 url로 설정
            setTitle(chart[chart.length-1].title);                 // 타이틀을 현재 재생중인 노래의 타이틀로 설정
            setArtist(chart[chart.length-1].artist);               // 아티스트를 현재 재생중인 노래의 아티스트로 설정 
            setPlayImg(chart[chart.length-1].cover_url);           // 앨범 이미지를 현재 재생중인 노래의 이미지로 설정
        } else {                        // 첫번째 곡이 아닌 나머지 경우
            setPlayingIndex(index-1);   // 이전 노래로 인덱스 설정
            setPlaying(true);
            Audio.current.src = chart[index-1].song_url;
            setTitle(chart[index-1].title);
            setArtist(chart[index-1].artist);
            setPlayImg(chart[index-1].cover_url);
        }
        Audio.current.play();
    }
    const skipNext = () => {
        const index = playingIndex;         // 인덱스를 현재 재생중인 노래의 인덱스로 설정
        if(index == chart.length - 1) {     // 제일 마지막 곡일 경우
            setPlayingIndex(0);             // 인덱스를 첫번째 곡 인덱스로 설정
            setPlaying(true);
            Audio.current.src = chart[0].song_url;      // audio의 src를 첫번째곡 url로 설정
            setTitle(chart[0].title);
            setArtist(chart[0].artist);
            setPlayImg(chart[0].cover_url);
        } else {                            // 마지막 곡이 아닌 나머지 경우
            setPlayingIndex(index + 1);     // 다음 노래로 인덱스 설정
            setPlaying(true);
            Audio.current.src = chart[index+1].song_url;
            setTitle(chart[index+1].title);
            setArtist(chart[index+1].artist);
            setPlayImg(chart[index+1].cover_url);
        }
        Audio.current.play();
    }

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;       // 참조하는 요소의 너비
        const offset = e.nativeEvent.offsetX;           // 클릭 이벤트가 발생한 위치의 x좌표를 가져옴

        const divprogress = offset / width * 100;       // 클릭한 x좌표를 너비로 나누고 백분율 형태로 계산
        Audio.current.currentTime = divprogress / 100 * currentSong.length; // 오디오 요소 currentTime을 업데이트
    }

    return (
        <PlayerContainer>
            <div className="navigation">
                <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                    <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
                </div>
            </div>
            <div className="controls">
                <div className="playTitle">{playing && <img src={playImg} style={{marginRight:60}}/>}{title}</div>
                <div className="btn">
                    <BsFillSkipStartFill className="btn_action" onClick={()=>skipBack()} />
                    {playing ? <BsFillPauseFill className="btn_action_pp" onClick={()=>onClick()} /> : <BsFillPlayFill className="btn_action_pp" onClick={()=>onClick()} />}    
                    <BsFillSkipEndFill className="btn_action" onClick={()=>skipNext()} />
                </div>            
                <div className="playTitle">{artist}</div>
            </div>
        </PlayerContainer>
    );
}

export default Player;