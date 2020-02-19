import _ from "lodash";

import songsBPMs from '../configs/songsBPMs.json';

import {TSongInfoArray} from "../ts-definitions/types";
import {IAppState, ISong, ISongsByBPM} from "../ts-definitions/interfaces";

import {BPM_SET, METRONOME_START, METRONOME_STOP} from './actionTypes';

// Group songs by BPM. Since we're importing songs from static config, we can do it here.
const songsByBPM: ISongsByBPM = songsBPMs.reduce<ISongsByBPM>((objBPM: ISongsByBPM, song: TSongInfoArray) => {
    const [title, artist, bpm] = song;
    if(bpm === undefined) { return objBPM; };
    if(!objBPM[bpm]) {
        objBPM[bpm] = [];
    }

    objBPM[bpm].push({artist, title});

    // Ensure the songs are always sorted by artist
    objBPM[bpm] = _.sortBy(objBPM[bpm], (song: ISong) => song.artist);
    return objBPM;
}, {} as ISongsByBPM);

const initialState: IAppState = {
    isPlaying: false,
    currentBPM: +_.keys(songsByBPM)[0],
    songsByBPM
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
        default:
            return state;
    }

    return state;
};

export {defaultReducer};
