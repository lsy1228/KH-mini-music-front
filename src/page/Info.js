import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosMini from "../api/AxiosMini";



const Body = styled.div`
    margin: 0;
    padding: 0;
    width: calc(100vw - 300px);
    height: calc(100vh - 40px);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: aliceblue;
    position: fixed;
    
    p {
        background-color: aliceblue;
    }
    img {
        margin: 10px;
        width: 250px;
        height: 250px;
    }
    img:hover {
        width: 300px;
        height: 300px;
    }
`;



const Info = () =>{
    const [songInfo, setSongInfo] = useState([]);


    useEffect(()=> {
        const songInfor = async() => {
            const rsp = await AxiosMini.songGet("ALL");
            if(rsp.status === 200) setSongInfo(rsp.data); 
        };
        songInfor();
    }, []);


    return(
            <Body>
                {songInfo.length > 0 && (
                    <img src={songInfo[1].cover_url} alt="" />
                )}; 
            </Body>  
    );
}


export default Info;