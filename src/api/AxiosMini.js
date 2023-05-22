import axios from "axios";
const Story_Board = "http://192.168.10.228:8111";

const AxiosMini = {
     // 로그인
     memberLogin: async(id, pw) => {    
        const login = {
            id : id,
            pwd : pw 
        };
        return await axios.post(Story_Board + "/login", login);
    },

    //회원 조회
    memberGet: async(id) => {
        return await axios.get(Story_Board + `/member?name=${id}`);
    },

    // 아이디 찾기 
    searchId: async (name, email) => {
            const searchId = {
                name : name,
                email : email
            };
        return await axios.post(Story_Board+ "/searchId", searchId);
      },


    // 비밀번호 찾기 
    searchPw: async (name, email, id) => {
            const searchPw = {
                name : name,
                email : email,
                id : id

            };
        return await axios.post(Story_Board+ "/searchPw", searchPw);
     },


    // 회원 가입 여부 확인
    memberRegCheck : async(id) => {
        return await axios.get(Story_Board + `/check?id=${id}`);
    },

    // 회원 가입
    memberReg: async(id, pwd, pwdchk, addr, name, mail, phone, rrn) => {
        const member = {
            USER_ID: id, 
            USER_PWD: pwd,
            USER_PWDCH: pwdchk,
            USER_ADDR: addr,
            USER_NAME: name,
            USER_EMAIL: mail,
            USER_PHONE: phone,
            RRN: rrn
        };
        return await axios.post(Story_Board + "/new", member);
    },

    //탈퇴
    memberSec : async(id_sec, pwd_sec) =>{
        const sec ={
            id : id_sec,
            pwd : pwd_sec            
        };
        return await axios.post(Story_Board + "/sec", sec);
    },


    // 노래 검색
    songFind : async(title) =>{
        const member ={
            title : title
        };
        return await axios.post(Story_Board + "/findsong", member);
    },

    // 노래차트
    songChart : async(id) => {
        return await axios.get(Story_Board + `/songChart/?id=${id}`); 
    },

    // 노래 정보 
    album : async(title) =>{
        return await axios.get(Story_Board + `/album/?title=${title}`)
    },

    // 이메일 인증
    mailCode : async(mail) => {
        return await axios.get(Story_Board + `/mail/?mail=${mail}`);
    },

    // 이메일 번호 
    mailCodeck : async(mail, code) => {
        const check = {
            mail : mail,
            code : code
        }
        return await axios.post(Story_Board + `/verify`, check);
    },
    // 노래 좋아요
    songLike : async(id, songId) => {
        const like = {
            id : id,
            songId : songId 
        }
        return await axios.post(Story_Board + "/songLike", like);
    },
    // 노래 좋아요 삭제
    songLikeDelete : async(id, songId) => {
        const likeDelete = {
            id : id,
            songId : songId
        }
        return await axios.post(Story_Board + "/songLikeDelete", likeDelete);
    }
};



export default AxiosMini; 