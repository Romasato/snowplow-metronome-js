import {BPM_SET, METRONOME_START, METRONOME_STOP} from './actionTypes';

const setBPM = (newBPM: number) => ({type: BPM_SET, bpm: newBPM});
const metroStart = () => ({type: METRONOME_START});
const metroStop = () => ({type: METRONOME_STOP});

export {
    setBPM,
    metroStart,
    metroStop
};
