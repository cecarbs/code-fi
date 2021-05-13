import axios from '../api';

//redux-thunk Action Creator
export const getSongs = () => async (dispatch) => {
    // Prevent components from rendering before data is retrieved
    dispatch({
        type: 'LOADING',
    })

    const songsData = await axios.get("/code-fi/songs")
    dispatch({
        type: 'FETCH_SONGS',
        payload: {
            songs: songsData.data
        }
    })
    dispatch({
        type: 'CURRENT_SONG',
        payload: {
            currentSong: songsData.data[0]
        }
    })
}

// export const setCurrentSong