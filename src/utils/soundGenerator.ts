import {Howl} from "howler";

import mp3TickURL from '../assets/audio/tick.mp3';

class SoundGenerator {
    constructor() {
        this.soundPlayer = new Howl({
            src: [mp3TickURL],
            autoplay: false,
            loop: false,
            volume: 0.8
        });
    }
    soundPlayer: Howl = null;
    soundInterval: NodeJS.Timeout = null;

    play = (bpm: number) => {
        this.stop(); // Stop current playback before starting new one
        this.soundPlayer.play(); // And start playing right away

        const msRepeatEvery: number = (60 / bpm) * 1000;
        this.soundInterval = setInterval(() => {
            this.soundPlayer.play();
        }, msRepeatEvery);
    };
    stop = () => {
        this.soundPlayer.stop();
        clearInterval(this.soundInterval);
    };
}

const soundGenerator = new SoundGenerator();
export {soundGenerator, SoundGenerator};
