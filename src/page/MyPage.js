import React, { useState }from "react";
import styled from "styled-components";



const Container=styled.div`
    width: calc(100vw - 300px);
    height: calc(100vh - 50px);
    background-color: #BB2649;
    position: fixed;
    background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 870px);
`;


const Head=styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: end;
    color: white;

    button{
        margin: 20px 50px 10px 10px;
        color: white;
        font-size: 11px;
        width: 110px;
        height: 30px;
        border-radius: 10px;    
        border: none;
        background: linear-gradient(70deg, blue, pink);
        &:hover{
            cursor: pointer;
        }
    }

    .id{
        display: flex;
        align-items: center;
        height: 30px;
        color: rgba(255,255,255,0.9);
        margin: 20px 0px 10px 10px;
        font-size: 14px;    
        font-weight: 500;
    }
`;


const Body=styled.div`
    width: 100%;
    height: calc(100vh - 310px);
    display: flex;
    overflow-y: scroll;
    flex-direction: row;
        @media only screen and (max-width: 1200px){  //화면 1200 픽셀 이하로 내려 갈 시 화면 구성 바뀐다.
            flex-direction: column;
        }    
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
        display: none;
    }

    .partition{  
        color: white;
        width: 50%;
        height: 575px; 
        @media only screen and (max-width: 1200px){    //화면 1200 픽셀 이하로 내려 갈 시 화면 구성 바뀐다.
            width: 100%;
        }        
    }

    .body{
        width: 100%;
        padding: 0 20px 0 0;
        display: flex;
        flex-direction: row;
        @media only screen and (max-width: 1200px){     //화면 1200 픽셀 이하로 내려 갈 시 화면 구성 바뀐다.
            flex-direction:column;
        }     
    }
`;


const InnerContain = styled.div`
    margin: 0px 50px 10px 20px;
    width: 97%;
    min-width: 300px;
    height: 180px;
    border: 1px solid white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    color: white;
    &:hover{
        background-color: rgba(255,255,255,0.2);
        cursor: pointer;
    } 

    span{
        font-size: 12px;
        height: 40px;
    }

    @media only screen and (max-width: 1200px){     //화면 1200 픽셀 이하로 내려 갈 시 화면 구성 바뀐다.
        width: 95%;
    }        
`;



const Footer=styled.div`
    width: 100%;
    height: 150px;

    .footContain{
        border: 1.4px solid rgba(255,255,255,0.5);
        height: 110px;
        border-radius: 18px;
        margin: 20px 10px 20px 10px;
        color: white;
        font-size: 11px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
`;



const MyPageMenu1 = [  
    { name : "내정보관리",
      info : "정보관리 및 변경을 할 수 있습니다."
    },
    { name : "알림",
      info : "활동에 대한 알림을 확인 할 수 있습니다."
    },
    { name : "맴버십",
      info : "맴버십 등급을 확인하고 관리할 수 있습니다."
    }
];
const MyPageMenu2 = [
    { name : "서비스안내",
        info : "FAQ / 문의 내역 / 문의 접수"
    },
    { name : "회원탈퇴",
        info : "회원정보를 모두 삭제하고 탈퇴하실 수 있습니다."
    }
];






const MyPage =(props)=>{

    //유저아이디를 window 스토리지에 넣어 다른 페이지에도 보여질 수 있도록 한다.
    const isUserIdSrt = window.localStorage.getItem("userIdSuv");
       
    //이벤트 2개가 들어가는지 확인 실제로 쓰이지는 않음.
    // const[sidemenu, setSidemenu] = useState("all"); 
    // const onSelect = q =>{
    //     setSidemenu(q); 
    // };       

    //프롭스로 값을 받아온다.
    const {changePage}=props;

    return(
        <Container>
            <Head>
                <div className="id">{isUserIdSrt}님</div>
                <button>MEMBERSHIP</button>
            </Head>
            <Body>
                <div className="body">
                    <div className="partition">
                    {MyPageMenu1.map(pm=>(
                        <InnerContain key={pm.name} 
                            onClick={()=>{
                                // onSelect(pm.name);
                                changePage(pm.name);
                            }}>
                            <h2>{pm.name}</h2> <br/> <span>{pm.info}</span>
                        </InnerContain>
                    ))}
                    
                    </div>
                    <div className="partition">
                    {MyPageMenu2.map(pm=>(
                        <InnerContain key={pm.name} 
                            onClick={()=>{
                                changePage(pm.name);
                            }}>
                            <h2>{pm.name}</h2> <br/> <span>{pm.info}</span>
                        </InnerContain>
                    ))}
                    </div>
                </div>
            </Body>
            <Footer>
                <div className="footContain">
                    Copyrightⓒ StoryBoard Crop. All Rights Reserved.
                </div>                
            </Footer>
        </Container>
    );
};


export default MyPage;