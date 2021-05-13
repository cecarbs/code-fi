import React from 'react';
import styled from 'styled-components';
// Redux
import { useSelector, useDispatch } from 'react-redux';

const LibrarySong = ({ song, audioRef }) => {
    const { isLoading, isPlaying, currentSong } = useSelector(state => state.songs)
    const dispatch = useDispatch();

    // SELECT SONG & UPDATE STORE
    const songSelectHandler = async () => {
        audioRef.current.play();
        // dispatch({
        //     type: 'TOGGLE_ACTIVE_PROPERTY',
        //     payload: {
        //         id: song.id
        //     }
        // })
        await dispatch({
            type: 'PLAY_SONG',
            payload: {
                isPlaying: true
            }
        })
        await dispatch({
            type: 'CURRENT_SONG',
            payload: {
                currentSong: song
            }
        })
        if (isPlaying) audioRef.current.play();
    };

    return (
        <>
            {!isLoading && (
                <LibrarySongContainer songid={song?.id} currentSongId={currentSong?.id} onClick={songSelectHandler}>
                    <AlbumCover src={song?.cover} />
                    <SongDescription>
                        <SongName>{song?.name}</SongName>
                        <Artist>{song?.artist}</Artist>
                    </SongDescription>
                </LibrarySongContainer>
            )}
        </>
    )
}

const LibrarySongContainer = styled.div`
    border-radius: 4px;
    display: flex;
    padding: 1rem 2rem 1rem 2rem;
    color: #2B2B2B;
    align-items: center;
    cursor: pointer;
    /* background: ${({ active }) => (active ? 'purple' : 'null')};   active={song.active}*/
    background: ${props => props.songid === props.currentSongId ? '#af68bd' : null};
    transition: transform 450ms;
    &:hover {
        background: #d88aaa;
        transition-delay: 150ms;
        transform: scale(1.2);
    }
`
const SongDescription = styled.div`
    padding-left: 1rem;
`
const AlbumCover = styled.img`
    width: 30%; 
    border-radius: 2px; 
`

const SongName = styled.h3`
    font-size: 1rem;
`

const Artist = styled.h4`
    font-size: 0.7rem;
`

export default LibrarySong

