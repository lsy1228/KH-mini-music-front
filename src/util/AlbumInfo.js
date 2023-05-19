import React ,{ useEffect }from "react";
import styled from "styled-components";
import AxiosMini from "../api/AxiosMini";
import { useState } from "react";

const Container=styled.div`
    padding: 10px;
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
    color: white;
    //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
    @media only screen and (max-width: 1000px){
        flex-direction: column;
    }


    .partition{
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 50%;
        height: 80%;
        //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
        @media only screen and (max-width: 1000px){
            width: 80%;
            height: 50%;
        }
        //파티션 안에 들어있는 이미지.
        img{
            width: 80%;
            height: auto;
            @media only screen and (max-width: 1000px){
                width: auto;
                height: 80%;
            }
        }

        .songInfo{
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 80%;
            height: 80%;
            //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
            @media only screen and (max-width: 1000px){
                width: 90%;
                height: 90%;
            }

            .infoArea{
                display: flex;
                width: 100%;
                height: 80px;

                .title{
                    width: 60%;
                    height: 100%;
                    font-size: 25px;
                    font-weight: bolder;
                    line-height: 38px;
                    //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
                    @media only screen and (max-width: 1000px){
                        font-size: 1.2rem;
                    }
                }

                .artist{
                    width: 40%;
                    height: 100%;
                    font-size: 15px;
                    font-weight: bolder;
                    line-height: 38px;
                    text-align: end;
                    //화면창이 1000px이하 일 떄  화면구성이 바뀐다.
                    @media only screen and (max-width: 1000px){
                        font-size: 1rem;
                    }
                }  
            }

            .album{
                display: flex;
                width: 100%;
                height: 80px;
        
                .albumName{
                    width: 60%;
                    height: 100%;
                    font-size: 18px;
                    font-weight: bolder;
                    line-height: 38px;
                    @media only screen and (max-width: 1000px){
                        font-size: 1rem;
                    }
                }

                .release{
                    width: 40%;
                    font-size: 12px;
                    font-weight: bolder;
                    text-align: end;
                    @media only screen and (max-width: 1000px){
                        font-size: 12px;
                    }
                }
            };
            
            // 앨범정보
            .Info{
                margin-top: 50px;
                font-size: 1.2rem;
                height: 50%;
                overflow-y: scroll;
                @media only screen and (max-width: 800px){
                    margin: 0;
                }
                ::-webkit-scrollbar {
                    display: none;
                }
            }  
        }
    }
`;




const ModalStyle = styled.div`
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        top: 0px;  // 화면 전체를 덮도록 위치
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
    }

    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }

    button {
        top: 5%;
        right: 120px;
        position: absolute;
        border: none;
        cursor: pointer;
        font-size: 30px;
        font-weight: 700;
        text-align: center;
        color: white;
        background-color: transparent;
        @media only screen and (max-width: 728px){
            right: 20px;

        }
    }

    section {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color:rgba(0, 0, 0, 0.6);
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
`;


const AlbumInfo = (props) => {
    const [album, setAlbum] = useState([]); 


    useEffect(()=> {
        const song = async() => {
            // 서버로부터 앨범 데이터 요청
            const rsp = await AxiosMini.album("*");
            console.log(rsp);   
            if(rsp.status === 200) setAlbum(rsp.data); 
        };
        song();
    }, []);




  const { open, close, selectedAlbum } = props; 
  

    return (

        <ModalStyle >
            {/* 모달이 열린 경우 openModal 과 modal 클래스가 모두 할당되고 닫혀있는 경우 modal 클래스만 할당  */}
            <div className={open ? 'openModal modal' : 'modal'}>   
                <section>
                    <button onClick={close}>
                        &times;
                    </button>                        
                        <Container key={album.title}>
                            <div className="partition">
                                <img src={selectedAlbum.cover_url} />  
                            </div>
                                <div className="partition">
                                    <div className="songInfo">
                                        <div className="infoArea">
                                            <div className="title">
                                                {selectedAlbum.title} 
                                            </div>
                                            <div className="artist">
                                                {selectedAlbum.artist}
                                            </div>
                                        </div> 
                                        <div className="album">
                                            <div className="albumName">
                                                {selectedAlbum.albumName}
                                            </div>
                                            <div className="release">  
                                                <p> 발매일 :  {selectedAlbum.release}</p>
                                            </div>
                                        </div>
                                            <div className="Info" >
                                                {selectedAlbum.info}
                                            </div>
                                    </div>
                                </div>
                        </Container>
                </section> 
            </div>
        </ModalStyle>
    );
};


export default AlbumInfo;