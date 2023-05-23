import React,{useContext} from "react";
import styled from "styled-components";
import axios from 'axios';
import PayLogo from "../image/payment_icon_yellow_small.png"
import { UserContext } from "../context/UserInfo";



const Container=styled.div`
  width: calc(100vw - 300px);
  min-width: 600px;
  height: calc(100vh - 50px);
  background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 1200px);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

    .wholeBody{  
          width: 700px;
          height: 800px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
      span{
          color: white;
          margin: 0 5px 0 5px;
          font-size: 30px;
          font-weight: bolder;
        }
      .partition1{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-radius: 20px;
          width: 100%;
          height: 80px;        
        }

      .partition2{
          margin: 20px 0 0 0;
          border: 2px solid rgba(255,255,255,0.2);
          box-shadow: 1px 0px 10px 0px rgba(255,255,255,0.4);
          display: flex;
          justify-content: space-evenly;
          align-items: center;    
          border-radius: 20px;
          width: 100%;
          height: 140px;    
        }    
    }
`;

const MemberShip =()=>{
    //컨텍스트에 카카오결제 페이지를 저장한다.
    const context = useContext(UserContext);
    const {setPayUrl,payUrl} = context; 
    
    
    //카카오 결제로 들어가는 axios
    const handlePayment1m = async () => {    
        try {
          const response = await axios.post(
            'https://kapi.kakao.com/v1/payment/ready',    
            {
              cid: 'TC0ONETIME', // 가맹점 CID
              partner_order_id: 'partner_order_id', // 가맹점 주문번호
              partner_user_id: 'partner_user_id', // 가맹점 회원 ID
              item_name: 'AEL 맴버십 1개월',
              quantity: 30,
              total_amount: 5500, // 결제 금액
              tax_free_amount: 0,
              approval_url: 'http://192.168.10.228:3000/PayResult', // 결제 성공 시 리다이렉트할 URL
              cancel_url: 'http://192.168.10.228:3000/kakaoPay', // 결제 취소 시 리다이렉트할 URL
              fail_url: 'http://192.168.10.228:3000/kakaoPay', // 결제 실패 시 리다이렉트할 URL
            },   
            {
              headers: {
                Authorization: `KakaoAK 76a5c5372efe9d4173b623ad46345210`,
                "Content-type": `application/x-www-form-urlencoded;charset=utf-8`
              },
            }
          );
          console.log(response.data); // 결제 요청 결과 확인
          console.log(response.data.next_redirect_pc_url);
          console.log(response.data.tid);
          window.localStorage.setItem("tid", response.data.tid);
          setPayUrl(response.data.next_redirect_pc_url);    
        } catch (error) {
          console.error("에러입니다1.");
          console.error(error);
        }
    };

    const handlePayment3m = async () => {    
      try {
        const response = await axios.post(
          'https://kapi.kakao.com/v1/payment/ready',    
          {
            cid: 'TC0ONETIME', // 가맹점 CID
            partner_order_id: 'partner_order_id', // 가맹점 주문번호
            partner_user_id: 'partner_user_id', // 가맹점 회원 ID
            item_name: 'AEL 맴버십 3개월',
            quantity: 90,
            total_amount: 13200, // 결제 금액
            tax_free_amount: 0,
            approval_url: 'http://192.168.10.228:3000/PayResult', // 결제 성공 시 리다이렉트할 URL
            cancel_url: 'http://192.168.10.228:3000/kakaoPay', // 결제 취소 시 리다이렉트할 URL
            fail_url: 'http://192.168.10.228:3000/kakaoPay', // 결제 실패 시 리다이렉트할 URL
          },   
          {
            headers: {
              Authorization: `KakaoAK 76a5c5372efe9d4173b623ad46345210`,
              "Content-type": `application/x-www-form-urlencoded;charset=utf-8`
            },
          }
        );
        console.log(response.data); // 결제 요청 결과 확인
        console.log(response.data.next_redirect_pc_url);
        console.log(response.data.tid);
        window.localStorage.setItem("tid", response.data.tid);
        setPayUrl(response.data.next_redirect_pc_url);

      } catch (error) {
        console.error("에러입니다2.");
        console.error(error);
      }
  };
  
    return(
        <Container>
            <div className="wholeBody">
                <div className="partition1">
                    <span>AEL이 준비한 특별한 선물</span>
                    3개월 결제시 20% 특가 할인 EVNET
                 </div>
                 <div className="partition2" onMouseOver={handlePayment1m}>
                      1개월 무제한 전곡 듣기
                      <span>월 5,500원  </span>                      
                      <a href={payUrl} target="_blank"><img src={PayLogo}/></a>
                  </div>  
                  <div className="partition2" onMouseOver={handlePayment3m}>
                      3개월 무제한 전곡 듣기
                      <span>월 13,200원  </span>                      
                      <a href={payUrl} target="_blank"><img src={PayLogo}/></a>
                  </div>                   
            </div>
        </Container>
    );
};


export default MemberShip;