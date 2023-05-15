import React ,{useContext}from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserInfo";

const Container=styled.div`
    padding: 10px;
    width: calc(100vw - 300px);
    height: calc(100vh - 60px);
    min-width: 400px;
    display: flex;
    background-color: rgba(0,0,0,0.7);
    color: white;
    position: fixed;
    //화면창이 1200px이하 일 때 플렉스 정렬 컬럼으로 바뀐다.
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
        //화면창이 1200px이하 일 떄  화면구성이 바뀐다.
        @media only screen and (max-width: 1000px){
            width: 100%;
            height: 50%;   
        }
        //파티션 안에 들어있는 이미지.
        img{
            width: 90%;
            @media only screen and (max-width: 1000px){
                width: auto;
                height: 90%;
            }
        }


        .songInfo{
            display: flex;
            flex-direction: column;
            width: 90%;
            height: 80%;
            @media only screen and (max-width: 1000px){
                width: 80%;
                height: 90%;
            }

                .likeCount{
                    width: 100%;
                    height: 30px;
                    font-size: 14px;
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
                    @media only screen and (max-width: 1000px){
                        font-size: 1.2rem;
                    }
                }

                .titleArtist{
                    width: 40%;
                    height: 100%;
                    font-size: 22px;
                    font-weight: bolder;
                    line-height: 38px;
                    text-align: end;
                    @media only screen and (max-width: 1000px){  
                        font-size: 1.2rem;
                    }
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
    const {songTitle,songArtist,albumName,lyrics,coverUrl} = context;
    //CLOB값으로 들어온 가사 값에 \n 값을 <br/>양식으로 바꿔준다.
    const newline = lyrics.replace(/\n/g,"<br/>");  

    return(
        <Container>
                <div className="partition">
                    <img src={coverUrl} />
                </div>
                <div className="partition">
                    <div className="songInfo">
                        <div className="likeCount">
                                ❤ 12564
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