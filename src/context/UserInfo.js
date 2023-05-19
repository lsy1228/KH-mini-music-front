import { createContext, useRef, useState } from "react"; 
export const UserContext = createContext(null); 


const UserStore = (props) => {
    const [userId, setUserId] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [isLogin, setIsLogin] = useState("FALSE"); 
    const [signUpId, setSignUpId] = useState("");
    const [addr, setAddr] = useState("");
    const [coverUrl, setCoverUrl] = useState("");

    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [albumName,setAlbumName] = useState("");
    const [lyrics,setLyrics] = useState("");
    const [likeCount, setLikeCount] = useState("");
    const [payUrl, setPayUrl] = useState(""); 

    const [playing, setPlaying] = useState(false); // 재생 상태
    const [playingIndex, setPlayingIndex] = useState(-1); // 재생중인 곡의 인덱스
    const [chart, setChart] = useState([]); // chart 데이터
    const [songUrl, setSongUrl] = useState("");
    const [currentSong, setCurrentSong] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [playImg, setPlayImg] = useState("");
    const Audio = useRef(null);

    const [allPlay, setAllPlay] = useState(false);
    const [randomPlay, setRandomPlay] = useState(false);
    
    return (
        <UserContext.Provider value={{
            userId, setUserId, 
            password, setPassword, 
            isLogin, setIsLogin,
            signUpId,setSignUpId,
            addr,setAddr,
            coverUrl, setCoverUrl,
            playing, setPlaying,
            songTitle, setSongTitle,
            songArtist, setSongArtist,
            albumName,setAlbumName,
            lyrics,setLyrics,
            likeCount, setLikeCount,
            playingIndex, setPlayingIndex,
            chart, setChart,
            songUrl, setSongUrl,
            currentSong, setCurrentSong,
            Audio,
            title, setTitle,
            payUrl, setPayUrl,
            artist, setArtist,
            playImg, setPlayImg,
            allPlay, setAllPlay,
            randomPlay, setRandomPlay}}>
            {props.children}
        </UserContext.Provider>   
    );
};

export default UserStore; 