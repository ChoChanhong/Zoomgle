import React, { useEffect } from 'react';
import styled from "styled-components";
import UserVideoComponent from './UserVideoComponent';
import DiceRoller from '../../components/utils/DiceRoller'
import { useState } from 'react';

const OpenViduSessionBlock = styled.div`
  width: 100vw;
  height: 100vh;
`;

const OpenViduSessionHeader = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  color: white;
  padding-left: 5vw;
`

const OpenViduSessionLeaveBtn = styled.div`
  cursor: pointer;
  width: 10vw;
  height: 5vh;
  background-color: white;
  border: 3px solid black;
  color: black;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #adff45;
  }
`

const MainVideo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 2rem;
  position: absolute;
  top: 25vh;
  left: 30vw;
  width: 40vw;
  height: 40vh;
  & video {
    cursor: initial;
  }
`;

const SwitchCameraBtn = styled.div`  
  cursor: pointer;
  width: 15vmin;
  height: 5vh;
  background-color: white;
  border: 2px solid black;
  color:black;
  :hover {
    background-color:#adff45;
  }
`

const TestContainer = styled.div`
  color: white;  
`;

const PlayerList = styled.div`
  width: 15vw;
  height: 30vh;
  font-size: 1rem;
  color:black;
  background-color: white;
  & p {
    font: 0.5rem;
    margin: 0;
  }
`

const UserVideoComponentContainer = styled.div`
  width: 10vmin;
  height: 10vmin;
  border: 3px solid white;
  cursor: pointer;
  position: absolute;
  &.pos0 {
    top: 80vh;
    left: 8.5vw;
  }

  &.pos1 {
    top: 85vh;
    left: 23vw;
  }

  &.pos2 {
    top: 85vh;
    left: 33vw;
  }

  &.pos3 {
    top: 85vh;
    left: 45vw;
  }

  &.pos4 {
    top: 85vh;
    left: 55vw;
  }

  &.pos5 {
    top: 85vh;
    left: 65vw;
  }

  &.pos6 {
    top: 85vh;
    left: 77vw;
  }

  &.pos7 {
    top: 68vh;
    left: 81vw;
  }

  &.pos8 {
    top: 50vh;
    left: 85vw;
  }

  &.pos9 {
    top: 23vh;
    left: 86vw;
  }

  &.pos10 {
    top: 3vh;
    left: 81vw;
  }

  &.pos11 {
    top: 4vh;
    left: 71vw;
  }

  &.pos12 {
    top: 3.5vh;
    left: 60vw;
  }

  &.pos13 {
    top: 2.5vh;
    left: 48vw;
  }

  &.pos14 {
    top: 3vh;
    left: 35.5vw;
  }

  &.pos15 {
    top: 3vh;
    left: 22vw;
  }

  &.pos16 {
    top: 16vh;
    left: 17vw;
  }

  &.pos17 {
    top: 30vh;
    left: 13vw;
  }

  &.pos18 {
    top: 40vh;
    left: 16vw;
  }

  &.pos19 {
    top: 50vh;
    left: 14vw;
  }
  &.testPos {
    margin-left: 2vw;
  }
`



const OpenViduSession = ({
  nextPlayer,
  setNextPlayer,
  isRoll,
  setIsRoll,
  isVote,
  setIsVote,
  vote,
  setVote,
  minigameResult,
  setMinigameResult,
  minigameDone,
  setMinigameDone,
  handleMainVideoStream,
  switchCamera,
  leaveSession,
  mySessionIdValue,
  myUserNameValue,
  mainStreamManager,
  publisher,
  players,
  subscribers,
  session,
  turnNum,
  setTurnNum,
  posList,
  setPosList,
}) => {
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = players.length; // 몇 명에서 하는지  
  const myTurnNum = players.indexOf(myUserNameValue);

  useEffect(() => {
    if (nextPlayer === myUserNameValue){
      handleMainVideoStream(publisher)
    } else {
      const temp = subscribers.filter((sub) => JSON.parse(sub.stream.connection.data).clientData === nextPlayer)[0];
      handleMainVideoStream(temp);
    }

  }, [nextPlayer])

  return (
    <OpenViduSessionBlock>
      <h1>{myUserNameValue}</h1>
      <TestContainer>
        <PlayerList>
          <p>내 턴번호: {myTurnNum}</p>
          <p>포지션리스트: {posList}</p>
          <p>플레이어 리스트</p>
          <p>사람수: {playerNum}</p>
          <p>누구턴: {turnNum}</p>
          <p>니이름: {myUserNameValue}</p>
          <p>누구냐:{players}</p>
          {players.map((playerName, i) => (
            <p key={i}>
              {i}번쨰: {playerName}
            </p>
          ))}
        </PlayerList>
        {/* {subscribers.map((sub, i) => (
          <p key={i}>{sub.stream.connection.data} {i}번쨰 유저</p>
        ))} */}
        {/* <p>{publisher.stream.connection.data}</p> */}
      </TestContainer>
      <OpenViduSessionHeader>
        <p>{mySessionIdValue}번 방</p>
        <OpenViduSessionLeaveBtn
          onClick={() => {
            leaveSession();
          }}
          value="Leave session"
        >
          Leave session
        </OpenViduSessionLeaveBtn>
      </OpenViduSessionHeader>
      {/* 그 중심에 뜨는 사람 일단 필요없음*/}
      {mainStreamManager !== undefined ? (
        <MainVideo>
          {/* <p>메인스트리머</p> */}
          <UserVideoComponent
            streamManager={mainStreamManager}
            mainStreamer={'mainStreamer'}
          />
        </MainVideo>
      ) : null}

      <SwitchCameraBtn
        onClick={() => {
          switchCamera();
        }}
      >
        Switch Camera
      </SwitchCameraBtn>
      {/* 비디오 컨테이너 */}
      {/* <VideoContainer> */}
      {publisher !== undefined ? (
        <UserVideoComponentContainer
          className={`pos${posList[myTurnNum]}`}
        >
          {/* onClick={() => handleMainVideoStream(publisher)} */}
          <UserVideoComponent
            streamManager={publisher}
            mainStreamer={'publisher'}
          />
        </UserVideoComponentContainer>
      ) : null}
      {subscribers.map((sub, i) => (
        <UserVideoComponentContainer
          className={`pos${posList[players.indexOf(JSON.parse(sub.stream.connection.data).clientData)]}`}
          key={i}
        >
          {/* onClick={() => handleMainVideoStream(sub) */}
          <UserVideoComponent streamManager={sub} mainStreamer={'sub'} />
        </UserVideoComponentContainer>
      ))}
      {/* </VideoContainer> */}
      {/* 주사위 */}
      {/* 턴 일 때만 보임 */}
      {(!isRoll & myTurnNum===turnNum) ? <DiceRoller
        players={players}
        setIsRoll={setIsRoll}
        isRoll={isRoll}
        session={session}
        posList={posList}
        playerNum={playerNum}
        myTurnNum={myTurnNum}
        setPosList={setPosList}
        setTurnNum={setTurnNum}
        mySessionIdValue={mySessionIdValue}
      ></DiceRoller>: ''}
    </OpenViduSessionBlock>
  );
};;;

export default OpenViduSession;