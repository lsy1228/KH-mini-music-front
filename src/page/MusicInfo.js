import React ,{useContext}from "react";
import styled from "styled-components";
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs';
import { UserContext } from "../context/UserInfo";

const Container=styled.div`
    padding: 10px;
    width: calc(100vw - 300px);
    height: calc(100vh - 40px);
    display: flex;
    background-color: rgba(0,0,0,0.7);
    color: white;

    //화면창이 1000px이하 일 때 플렉스 정렬 컬럼으로 바뀐다.
    @media only screen and (max-width: 1000px){
        flex-direction: column;
    }
    .partition{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 50%;
        height: 100%;

        //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
        @media only screen and (max-width: 1000px){
            width: 100%;
            height: 50%;
        }

        //파티션 안에 들어있는 이미지.
        img{
            width: 90%;
            //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
            @media only screen and (max-width: 1000px){
                width: auto;
                height: 90%;
            }
        }

        .songInfo{
            /* border: 1px solid white; */
            display: flex;
            flex-direction: column;
            width: 90%;
            height: 80%;

            //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
            @media only screen and (max-width: 1000px){
                width: 80%;
                height: 90%;
            }

            .likeCount{
                width: 100%;
                height: 30px;
                font-size: 14px;
                .btn_action_pp {
                    font-size: 30px;
                }
            }

            .infoArea{
                display: flex;
                width: 100%;
                height: 80px;

                .titleSong{
                    width: 60%;
                    height: 100%;
                    font-size: 40px;
                    font-weight: bolder;
                    line-height: 38px;
                }

                .titleArtist{
                    width: 40%;
                    height: 100%;
                    font-size: 22px;
                    font-weight: bolder;
                    line-height: 38px;
                    text-align: end;

                }
            }

            .lyrics{
                height:100%;
                overflow-y: scroll;
                -ms-overflow-style: none;
                ::-webkit-scrollbar {
                    display: none;
                }
            }
        }
    }
`;



const MusicInfo=()=>{
    const context = useContext(UserContext);
    const {songTitle,songArtist,albumName,lyrics, coverUrl, setPlaying ,playing, songUrl, setPlayImg, setArtist, setTitle, Audio, setCurrentSong, currentSong} = context;
    //CLOB값으로 들어온 가사 값에 \n 값을 <br/>양식으로 바꿔준다.
    const newline = lyrics.replace(/\n/g,"<br/>");  


    const onClick = () => {
        setPlaying(!playing);   // 재생상태 설정
        if(playing === true) {  // 재생중이면
            Audio.current.pause();      // 노래 멈춤
        }
        else {                  // 재생중이 아니면
            Audio.current.play();       // 노래 재생
            setPlayImg(coverUrl);
            setTitle(songTitle);
            setArtist(songArtist);
        }
    }

    const onPlaying = () => {
        const duration = Audio.current.duration;    // 노래의 전체길이
        const ct = Audio.current.currentTime;       // 노래의 현재 재생 시간
        setCurrentSong({...currentSong, "progress" : ct / duration * 100, "length":duration});
    };

    const handleAudio = () => {
        setPlaying(false);
    }

    return(
        <Container>
                <div className="partition">
                    <img src={coverUrl} />
                </div>
                <div className="partition">
                    <div className="songInfo">
                        <div className="likeCount">
                        {playing ? <BsFillPauseFill className="btn_action_pp" onClick={()=>onClick()} /> : <BsFillPlayFill className="btn_action_pp" onClick={()=>onClick()} />}
                        <audio src={songUrl} ref={Audio} onTimeUpdate={onPlaying} onEnded={handleAudio}></audio>
                        </div>
                        <div className="infoArea">
                               <div className="titleSong">
                                    {songTitle}
                               </div>
                               <div className="titleArtist">
                                    {songArtist}
                               </div>
                        </div>
                        <div className="infoArea">
                            {albumName}
                        </div>
                        {/* innerHTML 값에 html 양식으로 새로 정의한 newline을 넣는다. */}
                        <div className="lyrics" dangerouslySetInnerHTML={{__html:newline}}>                            
                        </div>
                    </div>
                </div>
        </Container>
    );
}
export default MusicInfo;