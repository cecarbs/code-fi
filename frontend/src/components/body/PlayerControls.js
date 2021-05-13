import React from "react";
// Styling
import styled from "styled-components";
import { PlayCircle } from "@styled-icons/fa-regular/PlayCircle";
import { SkipNext } from "@styled-icons/material-rounded/SkipNext";
import { SkipPrevious } from "@styled-icons/material-rounded/SkipPrevious";
import { PauseCircle } from "@styled-icons/fa-solid/PauseCircle";
import { Shuffle } from "@styled-icons/evaicons-solid/Shuffle";
import { Repeat } from "@styled-icons/evaicons-solid/Repeat";
// Redux
import { useSelector, useDispatch } from "react-redux";

const PlayerControls = ({ audioRef, songInfo, setSongInfo }) => {
  const dispatch = useDispatch();
  const { isPlaying, currentSong, songs, isShuffle } = useSelector(
    (state) => state.songs
  );

  // SHUFFLE SONG
  const shuffleHandler = async () => {
    let song = songs[Math.floor(Math.random() * songs.length)];
    await dispatch({
      type: "CURRENT_SONG",
      payload: {
        currentSong: song,
      },
    });
    await dispatch({
      type: "TOGGLE_SHUFFLE",
    });
    await dispatch({
      type: "PLAY_SONG",
      payload: {
        isPlaying: true,
      },
    });
    audioRef.current.play();
  };
  // PLAY/PAUSE & STORE UPDATE
  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch({
        type: "PLAY_SONG",
        payload: {
          isPlaying: false,
        },
      });
    } else {
      audioRef.current.play();
      dispatch({
        type: "PLAY_SONG",
        payload: {
          isPlaying: true,
        },
      });
    }
  };
  // SKIP THROUGH PARTS OF SONG
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // NEXT OR PREVIOUS SONG
  const skipTrackHandler = async (direction) => {
    // use currentSong.id to match against every song.id in array to return index
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "next" && isShuffle === false) {
      await dispatch({
        type: "CURRENT_SONG",
        payload: {
          currentSong: songs[(currentIndex + 1) % songs.length],
        },
      });
    } else if (direction === "next" && isShuffle === true) {
      let song = songs[Math.floor(Math.random() * songs.length)];
      await dispatch({
        type: "CURRENT_SONG",
        payload: {
          currentSong: song,
        },
      });
    }
    if (direction === "previous") {
      if (currentIndex === 0) {
        await dispatch({
          type: "CURRENT_SONG",
          payload: {
            currentSong: songs[songs.length - 1],
          },
        });
      } else {
        await dispatch({
          type: "CURRENT_SONG",
          payload: {
            currentSong: songs[(currentIndex - 1) % songs.length],
          },
        });
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  // CONVERTS SEC TO MIN + SEC
  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const secondsWithZero = String(seconds).padStart(2, "0");
    return `${minutes}:${secondsWithZero}`;
  };

  // TEMPORARY STYLING
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const background = {
    background: `linear-gradient(to right, ${currentSong?.color[1]}, ${currentSong?.color[0]})`,
  };
  return (
    <PlayerContainer>
      <TimeControlsContainer>
        <p>{getTime(songInfo?.currentTime)}</p>
        <Track style={background}>
          <Input
            min={0}
            max={songInfo?.duration || "0"}
            value={songInfo?.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <AnimateTrack style={trackAnimation} />
        </Track>
        <p>{songInfo.duration ? getTime(songInfo?.duration) : "0:00"}</p>
      </TimeControlsContainer>
      <ButtonsContainer>
        <RepeatIcon />
        <PreviousIcon onClick={() => skipTrackHandler("previous")} />
        {!isPlaying ? (
          <PlayIcon onClick={playHandler} />
        ) : (
          <PauseIcon onClick={playHandler} />
        )}
        <NextIcon onClick={() => skipTrackHandler("next")} />
        <ShuffleIcon onClick={shuffleHandler} isShuffle={isShuffle} />
      </ButtonsContainer>
      <div />
    </PlayerContainer>
  );
};
const PlayerContainer = styled.div`
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* background-color: lightpink; */
`;

const TimeControlsContainer = styled.div`
  /* background: red; */
  display: flex;
  width: 50%;
  input {
    width: 100%;
    padding: 1rem 0rem;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
  }
  p {
    padding: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const Input = styled.input.attrs((props) => ({
  type: "range",
}))`
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
  }
`;

const Track = styled.div`
  margin-top: 1rem;
  background: lightblue;
  width: 100%;
  height: 1rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
`;

const AnimateTrack = styled.div`
  background: rgb(204, 204, 204);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  /* transform: ${(props) => props.animTrack}; */
  pointer-events: none;
`;

const ButtonsContainer = styled.div`
  /* background: green; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 30%;

  @media screen and (max-width: 768px) {
    width: 70%;
  }
`;

const PlayIcon = styled(PlayCircle)`
  width: 3rem;
  cursor: pointer;
  color: #2b2b2b;
  &:hover {
    transform: scale(1.2) !important;
    transition: transform 0.2s ease-in-out;
  }
`;

const NextIcon = styled(SkipNext)`
  width: 2rem;
  cursor: pointer;
  color: rgb(204, 204, 204);
  &:hover {
    transform: scale(1.2) !important;
    transition: transform 0.2s ease-in-out;
  }
`;

const PreviousIcon = styled(SkipPrevious)`
  width: 2rem;
  cursor: pointer;
  color: rgb(204, 204, 204);
  &:hover {
    transform: scale(1.2) !important;
    transition: transform 0.2s ease-in-out;
  }
`;

const PauseIcon = styled(PauseCircle)`
  width: 3rem;
  cursor: pointer;
  color: rgb(204, 204, 204);
  &:hover {
    transform: scale(1.2) !important;
    transition: transform 0.2s ease-in-out;
  }
`;

const ShuffleIcon = styled(Shuffle)`
  /* background: ${({ isShuffle }) => (isShuffle ? "#2b2b2b" : "none")}; */
  border-radius: 6px;
  width: 2rem;
  color: ${({ isShuffle }) => (isShuffle ? "#2B2B2B" : "rgb(204, 204, 204)")};
  cursor: pointer;
  &:hover {
    transform: scale(1.2) !important;
    transition: transform 0.2s ease-in-out;
  }
`;

const RepeatIcon = styled(Repeat)`
  width: 2rem;
  color: rgb(204, 204, 204);
`;

export default PlayerControls;
