const initialState = {
    songs: [],
    currentSong: null,
    isLoading: true,
    isPlaying: false,
    isShuffle: false
}

const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SONGS':
            return {
                ...state,
                songs: action.payload.songs,
                isLoading: false,
            }
        case 'CURRENT_SONG':
            return {
                ...state,
                currentSong: action.payload.currentSong,
                isLoading: false,
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            }
        case 'PLAY_SONG':
            return {
                ...state,
                isPlaying: action.payload.isPlaying
            }
        case 'TOGGLE_ACTIVE_PROPERTY':
            return {
                ...state,
                songs: state.songs.map(song => song.id === action.payload.id ?
                    { ...song, active: true } : { ...song, active: false })
            }
        case 'TOGGLE_SHUFFLE':
            return {
                ...state,
                isShuffle: !state.isShuffle
            }
        default:
            return {
                ...state
            }
    }
};

export default songsReducer;