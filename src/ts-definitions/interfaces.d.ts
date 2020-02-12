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

export {ISongBPM, ISong, ISongsByBPM};
