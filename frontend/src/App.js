import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from './actions/songsActions'
// Components
import PlayerControls from './components/body/PlayerControls';
import SongDetails from './components/body/SongDetails';
import Library from './components/sidebar/Library';
import Navbar from './components/navbar/Navbar';

function App() {
  const { currentSong, songs, isPlaying, isShuffle } = useSelector(state => state.songs);
  const { isOpen } = useSelector(state => state.ui);
  const audioRef = useRef();

  // RETRIEVE SONGS FROM BACKEND
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch])

  // SONG DURATION TIME BAR
  const [songInfo, setSongInfo] = useState({
    currentTIme: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animation = (current / duration) * 100;
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
  };

  // SKIP FORWARD AFTER SONG FINISHES
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let song = songs[Math.floor(Math.random() * songs.length)];
    if (isShuffle) {
      await dispatch({
        type: 'CURRENT_SONG',
        payload: {
          currentSong: song
        }
      })
    } else {
      await dispatch({
        type: 'CURRENT_SONG',
        payload: {
          currentSong: songs[(currentIndex + 1) % songs.length]
        }
      });
    }
    if (isPlaying) audioRef.current.play();
  };

  return (
    <AppContainer isOpen={isOpen}>
      <GlobalStyles />
      <Navbar />
      <SongDetails />
      <PlayerControls
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library audioRef={audioRef} />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong?.audio}
        onEnded={songEndHandler}
      />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  flex: 1;
  transition: ${({ isOpen }) => isOpen ? 'all 0.5s ease' : 'all 0.5s ease'}; // make sure to change library transition when you change this
  margin-left: ${({ isOpen }) => isOpen ? '20rem' : '0'};
  background-image: linear-gradient(to bottom right, #fdb0ac, #d88aaa, #af68bd, #6e6092, #674762);
`
export default App;
