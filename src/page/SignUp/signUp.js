import React, { useState ,useContext, useCallback} from "react";
import styled from "styled-components";
import imgLogo from "../../image/로고.png"
import { useNavigate } from "react-router-dom";
import AxiosMini from "../../api/AxiosMini";
import Modal from "../../util/Modal";
import PopupPostCode from "../../api/PopupPostCode";
import { UserContext } from "../../context/UserInfo";



const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    overflow-y: scroll;
    background: linear-gradient(150deg,#BB2649, rgb(0,0,0) 650px);
`;


const InerContainer = styled.div`
        img {
        width: 150px;
        margin-top: 100px;
        margin-bottom: 40px;
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
        }

        input {
            height: 40px;
            width: 250px;
            background-color: #d4cacd;
            border-style: none;
            border-radius: 10px;
        }

        label {
            display: inline-block;
            width: 150px;
            text-align: left;
            margin-right: 90px;
            margin-top: 10px;
            font-size: 13px;
            font-weight: 500;
            color: white;
            
        }

    .hint {
      display: flex;
      margin: 5px 0px 0px 8px;
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
    }

    .success {
        color: royalblue;
    }

    .error {
        color: red;
    }

    .itemGender label {
        display: inline-block;
        width: 150px;
        margin-left: 0;
    }

    .itemGender input[type="radio"] {
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
        margin-left: 15px;
    }

    .itemPhone {
        width: 240px;
        justify-content: center;
        align-items: center;
        margin-left: 35px;
    }

    .days {
        width: 70px;
        margin: 7px;
        font-weight: bold;
    }

    .gender {
        width: 15px;
        margin: 10px 20px;
    }

    span {
        color: white;
    }

    .select {
        margin-bottom: 10px;
        width: 250px;
        height: 40px;
        background: #d4cacd;
        border-style: none;
        border-radius: 10px;
    }

    .phoneNum {
        width: 240px;
        margin-bottom: 10px;
    }
    
    .phoneNumBtn {
        margin-left: 10px;
        height: 40px;
    }

    button {
        border-style: none;
        color: white;
        background: #b12548;
        border-radius: 10px;
    }

    .phoneNumCH {
        margin-bottom: 10px;
        text-align: center;
    }

    .addrInput {
        margin-bottom: 10px;
    }

    .addrFind {
        margin-bottom: 10px;
        margin-right: 10px;
        width: 170px;
    }

    .addrBtn {
        height: 40px;
    }

    .submitBtn {
        align-items: center;
        justify-content: center;
    }

    .enable-button {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    width: 265px;
    height: 50px;
    color: white;
    background-color: #b12548;
    font-size: 15px;
    font-weight: 400;
    font-weight: 700;
    border-radius: 10px;
  }

  .enable-button:active {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    width: 265px; 
    height: 50px;
    color: white;
    background-color: #b12548;
    font-size: 15px;
    font-weight: 400;
    font-weight: 700;
    border-radius: 10px;
    &:hover {
        border: 1px solid black;
    }
  }

  .disable-button {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 265px; 
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 10px;
  }

  .inputEmail {
    width: 200px;
    margin-bottom: 10px;
  }
`;

const SignUp = () => {

    const navigate = useNavigate();

    //키보드 입력받기
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputConPw, setInputConPw] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputRrn, setInputRrn] = useState("");

    // 오류 메시지
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [rrnMessage, setRrnMessage] = useState("");
    

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isRrn, setIsRrn] = useState(false); 

    //저장된 주소와 아이디값을 설정하여 주소는 받아오고 아이디값은 저장한다.
    const context = useContext(UserContext);
    const {addr,setSignUpId} = context;

    //주소찾기 영역
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true);
    }
     
	// 팝업창 닫기
    const closePostCode = (e) => {
        setIsPopupOpen(false);

    }

    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModelText] = useState("중복된 아이디 입니다.");

    const closeModal = () => {
       setModalOpen(false);
    };

    
    //아이디 정규식
    const onChangId =(e) => {
        const inputIdRegex = /^[a-zA-Z0-9]{4,12}$/ // 아이디 정규식
        const idCurrent = e.target.value;
        setSignUpId(e.target.value);
        setInputId(idCurrent);
        if (!inputIdRegex.test(idCurrent)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);
        }else {
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
        }
    }
    //비밀번호 정규식
    const onChangePw = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/ // 비밀번호 정규식
        const passwordCurrent = e.target.value ;
        setInputPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }        
    }

    //비밀번호 확인
    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputPw) {
            setConPwMessage('비밀 번호가 일치하지 않습니다.') // 입력한 비밀번호가 일치해야 함
            setIsConPw(false)
        } else {
            setConPwMessage('비밀 번호가 일치 합니다. )')
            setIsConPw(true);
        }      
    }
    
    // 이름 정규식
    const onChangeName = (e) => {
        const inputNameRegex = /^[가-힣]{2,5}$/ // 이름은 한글로만 2자리 이상 5자리 미만
        const nameCurrent = e.target.value;
        setInputName(nameCurrent);
        if (!inputNameRegex.test(nameCurrent)) { // 이름은 잘못 입력 되었을 때
            setIsName(false);
        } else {
            setIsName(true);
        }
    }

    //메일 정규식
    const onChangeMail = (e) => {
        const inputEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const emailCurrent = e.target.value;
        setInputEmail(emailCurrent);
        if (inputEmailRegex.test(emailCurrent)) { // 이메일 입력이 잘 못 되었을 때
            setEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true);
        } else {
            setEmailMessage('이메일 형식이 올바르지 않습니다.')
            setIsEmail(false)
        } 
    }

    //전화번호 정규식
    const onChangePhone = (e) => {
        const inputPhoneRegex = /^\d{3}\d{3,4}\d{4}$/
        const phoneCurrent = e.target.value;
        setInputPhone(phoneCurrent);
        if (!inputPhoneRegex.test(phoneCurrent)) { // 전화번호 입력이 잘 못 되었을 때
            setPhoneMessage('전화번호 형식이 올바르지 않습니다.')
            setIsPhone(false)
        } else {
            setPhoneMessage('올바른 전화번호 형식입니다.')
            setIsPhone(true);
        } 
    }

    // 주민번호 정규식
    const onChangeRrn = e => {
        const inputRrnRegex = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{7}$/
        const rrnCurrent = e.target.value
        setInputRrn(rrnCurrent);
        if(!inputRrnRegex.test(rrnCurrent)) {
            setRrnMessage('주민등록 번호 형식이 올바르지 않습니다.')
            setIsRrn(false);
        } else {
            setRrnMessage('올바른 주민등록번호 형식입니다.')
            setIsRrn(true);
        }
    }

    const onClickEmailAuth = async() => { 
        console.log("이메일 인증 호출 : " + inputEmail);
        const res = await AxiosMini.mailCode(inputEmail);
				// Axios를 이용하여 서버로 inputEmail 변수에 담긴 이메일 주소를 전송하고, 
				//서버에서 생성한 랜덤한 인증 코드를 받아오는 API를 호출
        console.log(res.data);

    }
  

    const onClickLogin = async() => {
        console.log("Click 회원가입");
         // 가입 여부 우선 확인
         const memberCheck = await AxiosMini.memberRegCheck(inputId);
         console.log("가입 가능 여부 확인 : ", memberCheck.data);
         // 가입 여부 확인 후 가입 절차 진행
         
         if (memberCheck.data === true) {
             console.log("가입된 아이디가 없습니다. 다음 단계 진행 합니다.");
 
 
             const memberReg = await AxiosMini.memberReg(inputId, inputPw, inputConPw, addr, inputName, inputEmail, inputPhone, inputRrn);
             console.log(addr);
             console.log(memberReg.data.result);
             if(memberReg.data === true) {
                 navigate('/welcome');
             } else {
                 setModalOpen(true);
                 setModelText("회원 가입에 실패 했습니다.");
             }
 
         } else {
             console.log("이미 가입된 회원 입니다.")
             setModalOpen(true);
             setModelText("이미 가입된 회원 입니다.");
         } 
     }
      
    return(
        <Container>
            <InerContainer>
            <div className="Logo">
                <img src={imgLogo} alt="logo" />
            </div>
            <br />
            <div className="item">
                <label className="ID">아이디</label>        
                <br />
                <input type="text" className="ID" value={inputId} onChange={onChangId}/>
            </div>
            <div className="hint">
                    {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
            </div>
            <div className="item">
                <label className="PWD">비밀번호</label>
                <br />
                <input type="password" className="PWD" value={inputPw} onChange={onChangePw}/>
            </div>
            <div className="hint">
                    {inputPw.length > 0 && (
                    <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
            </div>
            <div className="item">
                <label className="PWDCK">비밀번호 재확인</label>
                <br />
                <input type="password" className="PWDCK" value={inputConPw} onChange={onChangeConPw}/>
            </div>
            <div className="hint">
                    {inputPw.length > 0 && (
                    <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
            </div>
            <div className="item">
                <label className="name">이름</label>
                <br />
                <input type="text" className="name" value ={inputName} onChange={onChangeName}/>
            </div>
            <div className="item">
                <label htmlFor="email">이메일</label>
                <br />
                <input className="inputEmail" type="email" value ={inputEmail} onChange={onChangeMail}/>
                <button className="phoneNumBtn" id="phone" onClick={onClickEmailAuth}>인증</button>
                <br />
                <input className="phoneNumCH" type="text" id="inputNum" placeholder="인증번호 입력"/>
            </div>
            <div className="hint">
                    {inputEmail.length > 0 && (
                    <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}
            </div>
            <div className="itemBD">
            <label className="BD">주민등록번호</label>
            <br />
                <input type="text"   placeholder="ex)230502 3******" value={inputRrn} onChange={onChangeRrn}/>
                    <div className="hint">
                    {inputRrn.length > 0 && (
                    <span className={`message ${isRrn ? 'success' : 'error'}`}>{rrnMessage}</span>)}
                    </div>
            </div>
            <div className="itemGender">
                <label>성별</label>
                <br />
                <input type="radio" name="gender" value="male"  className="gender"/> <span>남자</span>
                <input type="radio" name="gender" value="female" className="gender"/> <span>여자</span>
                <input type="radio" name="gender" value="other" className="gender"/> <span>기타</span>
            </div>
            <div className="itemPhone">
                <label className="phoneNum">휴대전화</label>
                <br />
                <select className="select">
                    <option value="kr">대한민국 +82</option>
                </select>
                <br />
                <input className="phoneNum" type="text" id="phone" placeholder="전화번호 입력" onChange={onChangePhone}/> 
                
            </div>
            <div className="addr">
            <label className="addrLabel" >주소</label>
                <br />
                <input type="text" className="addrInput" value={addr} />
                <br />
                <input type="text" className="addrFind"/>
                <button className="addrBtn" onClick={openPostCode}>주소 찾기</button>
                <div id='popupDom'>
                {isPopupOpen && (                    
                        <PopupPostCode onClose={closePostCode} />
                 )} 
                 </div>

            </div>
            <div className="submitBtn">
               {(isId && isPw && isConPw && isName && isEmail && isPhone && isRrn) ? 
                    <button className="enable-button" onClick={onClickLogin}>가입하기</button> :
                    <button className="disable-button">가입하기</button> }
                    <Modal open={modalOpen} close={closeModal} header="오류">{modalText}</Modal>
            </div>

            </InerContainer>
        </Container>
    );
}

export default SignUp;