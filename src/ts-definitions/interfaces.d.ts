interface ISongBPM {
    title: string;
    artist: string;
    bpm: number;
}

interface ISong {
    artist: string;
    title: string;
}

interface ISongsByBPM {
    [bpm: number]: Array<ISong>;
}

interface IAppState {
    isPlaying: boolean;
    currentBPM: number;
    songsByBPM: ISongsByBPM;
    isFetchingSongs: boolean;
}

export {
    IAppState,
    ISongBPM,
    ISong,
    ISongsByBPM
};
