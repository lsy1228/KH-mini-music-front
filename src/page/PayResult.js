import React  from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container= styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 1200px);
`

const Button = styled.button`
border: none;
height:30px;
border-radius: 4px;
background-color: rgba(255,255,255,0.7);
`
const PayResult =()=>{
    //apprval_url 을 통해서 받아온 현재 주소에는 pg_token값이 붙어있다. 이를 추출하여야 함
    const location = useLocation();
    //현재 로케이션값을 통해 어떤 값을 가져와야하는지 알 수 있다.
    console.log(location);
    //search르 통해서 ?뒤에 붙은 값을 가져온다
    const url = location.search;
    //=뒤에 붙은 pg_token값을 가져온다.
    const pgToken = url.split('=')[1];
    //최종 token값이 완성된다.
    console.log(pgToken);   
    console.log(window.localStorage.getItem("tid"));

    const handleApprove = async () => {   
        try {       
          const response = await axios.post(
            'https://kapi.kakao.com/v1/payment/approve',    
            {
              cid: 'TC0ONETIME', // 가맹점 CID
              tid: window.localStorage.getItem("tid"),
              partner_order_id: 'partner_order_id', // 가맹점 주문번호
              partner_user_id: 'partner_user_id', // 가맹점 회원 ID
              pg_token: pgToken,

            },   
            {
              headers: {
                Authorization: `KakaoAK 02be1b58e11c4a0376b6ad075800f833`,       // 카카오톡 API 접속 로그인 후 내 애플리케이션 Admin키 저장 
                "Content-type": `application/x-www-form-urlencoded;charset=utf-8`
              },
            }
          );
          console.log(response.data); // 결제 요청 결과 확인 
          console.log(response.data.amount); // 가격확인
          console.log(response.data.amount.total); // 가격확인
          console.log(response.data.quantity); //수량 확인
          // window.close();//결제 완료후 창이 닫긴다.
          
        } catch (error) {
          console.error("에러입니다1.");
          console.error(error);
        }
    };

    return (
      <Container>
        <Button onClick={handleApprove}>
                버튼을 누르면 결제가 완료됩니다.
        </Button>
        </Container>
    )
}
export default PayResult;
