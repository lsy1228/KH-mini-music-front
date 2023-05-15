import React from "react";
import List from "../PlayList/List";
import styled from "styled-components";

const AlbumBody = styled.div`
    position: absolute;
    display: flex;
   .albumImg {
    width: 500px;
    height: 500px;
    /* position: relative;
    top: 130px;
    left: 150px; */
   }

   .nowSong {
    position: relative;
    left: 170px;
   }

   .nowTitle {
    text-align: center;
    color: white;
    font-weight: bold;
    margin: 10px 0;
    font-size: larger;
   }

   .nowArtist {
    text-align: center;
    color: white;
   }
   
   .playList {
    color: white;
    position: relative;
    top: 10px;
    left: 440px;
    font-weight: bold;
   }
`;

const Album = ({albumData, currAlbum, onSelect}) => { // Album은 Main으로부터 albumData, currAlbum, onSelect를 넘겨받음
    const {image, title} = currAlbum;  // 구조분해, currAlbum를 분해해서 image와 title에 맞는 값을 할당

    return (
        <AlbumBody>
            <div className="nowSong">
                <img src={image} alt={title} className="albumImg" />    {/*현재 재생중인 앨범을 크게 나타냄*/}
            </div>
            <div className="playList">이어지는 노래</div>
                <ul className="imgList"> 
                    { //albumData를 순회하면서 List로 albumData값과 onSelect를 넘김
                        albumData.map(item =>
                            <List key={item.id} item={item} onSelect={onSelect} />)
                    }
                </ul>
        </AlbumBody>
    );
}
export default Album;