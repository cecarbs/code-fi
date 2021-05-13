import React from 'react';
// Styling
import styled from 'styled-components';
import LibrarySong from './LibrarySong'
// Redux
import { useSelector } from 'react-redux';

const Library = ({ audioRef }) => {
    const { songs } = useSelector(state => state.songs)
    const { isOpen } = useSelector(state => state.ui)

    return (
        <LibraryContainer isOpen={isOpen}>
            <h2>Library</h2>
            <div>
                {songs.map(song => (
                    <LibrarySong
                        song={song}
                        audioRef={audioRef}
                        key={song.id}
                    />))}
            </div>
        </LibraryContainer>
    )
}

const LibraryContainer = styled.div`
    position: fixed; 
    top: 0;
    left: 0; // right: 0 (if you want on rightside)
    width: 20rem;
    height: 100%;
    background-color: white;
    box-shadow: 2px 2px 50px gray;
    overflow: scroll;
    // ANIMATION
    transform: ${({ isOpen }) => isOpen ? 'translateX(0%)' : 'translateX(-100%)'};
    transition: all 0.5s ease;
    opacity: ${({ isOpen }) => isOpen ? '1' : '0'};

    h2 {
        padding: 2rem;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export default Library;

