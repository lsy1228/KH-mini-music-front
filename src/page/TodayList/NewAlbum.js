import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosMini from "../../api/AxiosMini";
import AlbumInfo from "../../util/AlbumInfo";


const Body = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: calc(100vh - 240px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    background-color: black;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 1300px){
        width: 100%;
    }
`;

const Container_in = styled.div`
    margin: 10px 10px 10px 15px;
    height: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    color: white;
    transition: ease 0.4s;

    @media only screen and ( min-width: 1300px){ // 화면 너비가 1300px 이상일 때 스타일 변경
        width: 18%;
        flex-direction: column;
    }

    &:hover{
        background-color: #BB2649;
        color: black;
    }   

    img{
        width: 200px;
        height: 200px;
        background-color: #BB2649;
        display: block;
    }

    .TITLE{
        width: 200px;
        font-size: 15px;
        font-weight:bolder;
    }
    .artist{
        color: #ccc;
        width: 200px;
        font-size: 10px;
    }
`;




const NewAlbum = () =>{

    const [album, setAlbum] = useState([]); 
    // 모달 창 열림/닫힘 상태 저장 
    const [modalOpen,setModalOpen] = useState(false);  
    // 모달 창에서 선택된 앨범 정보 저장
    const [selectedAlbum, setSelectedAlbum] = useState(null);

   

    // 닫기 버튼 호출
    const closeModal = () =>{
        setModalOpen(false);
    };

    
    useEffect(()=> {    
        const song = async() => {
            const rsp = await AxiosMini.album("*");
            console.log(rsp);   
            if(rsp.status === 200) setAlbum(rsp.data); 
        };
        song();
    }, []);



    return(
        <Body>
            {album.map((e) =>(      // album 배열의 요소를 하나씩 꺼내온다.
            <Container_in key={e.title}> 
                <div className="view">
                    <img
                        src={e.cover_url}
                        onClick={() => {
                            setSelectedAlbum(e);    // 클릭한 앨범 정보 업데이트 
                            setModalOpen(true);     // modal 호출  
                        }}
                        />
                        <div className="TITLE">{e.title}</div>      
                        <div className="artist">{e.artist}</div>
                </div>
            </Container_in>
            ))}
                {selectedAlbum && (     // 참일 때 선택한 앨범이 있을 때 AlbumInfo가 렌더링
                    <AlbumInfo 
                    open={modalOpen}    
                    type={true}                   
                    close={closeModal}
                    selectedAlbum={selectedAlbum} // AlbumInfo로  selectedAlbum 정보 전달
                    />
            )}
        </Body>
    );
};

export default NewAlbum;