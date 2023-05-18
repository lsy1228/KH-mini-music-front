import React from "react";
import styled from "styled-components";
import ALBUM from "../../image/IVE.png";



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
    @media only screen and (max-width: 1200px){
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
    @media only screen and ( min-width: 1200px){
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
        font-size: 20px;
        font-weight:bolder;
    
    }

    .artist{
        width: 200px;
        font-size: 12px;
    }
`;

const NewInfo = () =>{
  
    return(
        <Body>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
            </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        <Container_in>
            <div className="view">
                <img src={ALBUM}/>
                <div className="TITLE">New Release</div>      
                <div className="artist">아이브, 포스트 말론</div>
            </div>
        </Container_in>
        </Body>
    );
};

export default NewInfo;