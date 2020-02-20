import _ from 'lodash';
import CONST from '../constants';

import {TSongInfoArray} from '../ts-definitions/types';
import {IAppState, ISong, ISongsByBPM} from '../ts-definitions/interfaces';

import {BPM_SET, METRONOME_START, METRONOME_STOP, NET_FETCH_SONGS} from './actionTypes';

// Group songs by BPM
function groupSongsByBPM(songsArray: TSongInfoArray[]): ISongsByBPM {
    const songsByBPM: ISongsByBPM = songsArray.reduce<ISongsByBPM>((objBPM: ISongsByBPM, song: TSongInfoArray) => {
        const [title, artist, bpm] = song;
        if (bpm === undefined) {
            return objBPM;
        }
        ;
        if (!objBPM[bpm]) {
            objBPM[bpm] = [];
        }

        objBPM[bpm].push({artist, title});

        // Ensure the songs are always sorted by artist
        objBPM[bpm] = _.sortBy(objBPM[bpm], (song: ISong) => song.artist);
        return objBPM;
    }, {} as ISongsByBPM);

    return songsByBPM;
}

const initialState: IAppState = {
    isPlaying: false,
    currentBPM: 0,
    songsByBPM: {},
    isFetchingSongs: false
};

const defaultReducer = (oldState: object = initialState, action: any): object => {
    const state = Object.assign({} as IAppState, oldState);

    switch(action.type) {
        case BPM_SET:
            state.currentBPM = action.bpm;
            return state;
            break;
        case METRONOME_START:
            state.isPlaying = true;
            return state;
            break;
        case METRONOME_STOP:
            state.isPlaying = false;
            return state;
            break;
        case NET_FETCH_SONGS:
            state.isFetchingSongs = action.status === CONST.STORE.STATUS_TYPE.START;
            if(action.status === CONST.STORE.STATUS_TYPE.DONE) {
                state.songsByBPM = groupSongsByBPM(action.songsArray);
                state.currentBPM = +Object.keys(state.songsByBPM)[0]
            }

            return state;
            break;
        default:
            return state;
    }

    return state;
};

export default defaultReducer;
