import React,{useContext} from 'react';
import DaumPostcode from "react-daum-postcode";
import { UserContext } from '../context/UserInfo';
import styled from "styled-components";

  //yarn add react-daum


  const Button = styled.button`
        display: flex;
        top: 10%;
        width: 80px;
        height: 40px;
        padding: 7px;
  `
const PopupPostCode = (props) => {
	  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const context = useContext(UserContext);
    const {setAddr} = context; 
    const {changePage}=props;

    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          };
          if (data.buildingName !== '') {
              extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          };
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        };
        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);
        setAddr(fullAddress);
        props.onClose();
    };
  
    return(
      <div>
      <DaumPostcode  onComplete={handlePostCode} />
      </div>
  )
}
 
export default PopupPostCode;