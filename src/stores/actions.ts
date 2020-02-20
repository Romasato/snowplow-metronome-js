import {Dispatch} from 'redux';

import {
    BPM_SET,
    METRONOME_START,
    METRONOME_STOP,
    NET_FETCH_SONGS
} from './actionTypes';
import CONST from '../constants';


const setBPM = (newBPM: number) => ({type: BPM_SET, bpm: newBPM});
const metroStart = () => ({type: METRONOME_START});
const metroStop = () => ({type: METRONOME_STOP});
const fetchSongs = () => {
    return (dispatch: Dispatch) => {
        dispatch({type:NET_FETCH_SONGS, status: CONST.STORE.STATUS_TYPE.START});

        // Faking async songs+BPMs fetching. Skipping error handling for demonstration purposes.
        setTimeout(() => {
            import(/*webpackChunkName:"songsData"*/
                '../configs/songsBPMs.json')
                .then((songsArray) => {
                    dispatch({
                        type: NET_FETCH_SONGS,
                        status: CONST.STORE.STATUS_TYPE.DONE,
                        songsArray: songsArray.default
                    });
                });
        }, 2000);
    };
};

export {
    setBPM,
    metroStart,
    metroStop,
    fetchSongs
};
