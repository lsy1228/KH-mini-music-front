import styled from "styled-components";
import ALBUM from "../../image/R.jpg"

const Body = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: calc(100vh - 330px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
    flex-wrap: wrap;
    background-color: black;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Container_in = styled.div`
    margin: 8px 18px 8px 8px;
    width: 100%;
    height: 150px;
    border-radius: 20px;
    background-color: rgba(255,255,255,0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    color: white;
    transition: ease 0.4s;
    &:hover{
        background-color: #BB2649;
        color: black;
    }

    .ranking{
        margin: 0 0 0 30px;
        font-size: 20px;
    }

    img{
        margin: 0 17px 0 17px;
        width: 120px;
        height: 120px;
        background-color: #BB2649;
        border-radius: 15px;
        display: block;
    }

    .TITLE{
        width: 500px;
        font-size: 30px;
        font-weight:bolder;
    }

    .artist{
        width: 200px;
        font-weight: bolder;
    }

    .minute{
        width: 100px;
    }

    .play{
        font-size: 30px;
        background-color: rgba(0,0,0,0);
        border: none;
    }

    .stop{
        font-size: 30px;
    }
    
    .more{
        width: 100px;
        text-align: center;
        font-size: 40px;
    }
`;

const UPRISING=()=>{


    return(
        <Body>
            <Container_in>
                <div className="ranking">1.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">2.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">3.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">4.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">5.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">6.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">7.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">8.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">9.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
            <Container_in>
                <div className="ranking">10.</div>
                <img src={ALBUM}/>
                <div className="TITLE">Weekend(featuring Miguel)</div>      
                <div className="artist">Mac Miller</div>
                <div className="minute">3:15</div>           
                <div className="play">▶</div>
                <div className="stop"></div>           
                <div className="more">:</div>
            </Container_in>
        </Body>
    );
};


export default UPRISING;
