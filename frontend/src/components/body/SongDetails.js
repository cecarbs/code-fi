import React from 'react';
import styled from 'styled-components';
// Redux
import { useSelector } from 'react-redux';

const SongDetails = () => {
    const { currentSong, isLoading, isPlaying } = useSelector(state => state.songs)

    return (
        <>
            {!isLoading && (
                <SongDetailsContainer>
                    <AlbumCover src={currentSong?.cover} isPlaying={isPlaying} />
                    <SongName>{currentSong?.name}</SongName>
                    <Artist>{currentSong?.artist}</Artist>
                </SongDetailsContainer>
            )}
        </>

    )
}

const SongDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 55vh;
    /* background-color: lightblue; */
    align-items: center;
    justify-content: center;
    color: #2b2b2b;

    @media screen and (max-width: 768px) {
        img {
            width: 60%;
        }
    }
`
const AlbumCover = styled.img`
    width: 20%;
    border-radius: 50%;
    animation: ${({ isPlaying }) => isPlaying ? 'rotation 20s infinite linear' : ''};

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

`

const SongName = styled.h2`
    padding: 3rem 1rem 1rem 1rem;
`

const Artist = styled.h3`
    font-size: 1rem;
`
export default SongDetails;
