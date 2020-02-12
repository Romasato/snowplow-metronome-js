import React from 'react';
import _ from 'lodash';
import {Howl} from 'howler';

import CONFIG from '../config.json';
import mp3TickURL from '../assets/audio/tick.mp3';
import {ISongsByBPM, ISong} from '../ts-definitions/interfaces';

import {MetroAnimation} from './MetroAnimation';
import {MetroPlayControl} from './MetroPlayControl';
import {MetroBPMControls} from './MetroBPMControls';
import {MetroSongsMatchingBPM} from './MetroSongsMatchingBPM';

import '../styles/components/App.scss';

// Since we're importing songs from static config, we can do it here
const songsByBPM = CONFIG.songsBPMs.reduce<ISongsByBPM>((objBPM: any, song: Array<any>) => {
    const [title, artist, bpm] = song;
    if(bpm === undefined) { return objBPM; };
    if(!objBPM[bpm]) {
        objBPM[bpm] = [];
    }

    objBPM[bpm].push({artist, title});
    return objBPM;
}, {} as ISongsByBPM);

interface IComponentState {
    currentBPM: number,
    isPlaying: boolean
}

/**
 * Main app component
 */
class App extends React.Component<{}, IComponentState> {
    state = {
        currentBPM: +_.keys(songsByBPM)[0],
        isPlaying: false
    };

    // Setup the sound we are going to be playing
    tickSound = new Howl({
        src: [mp3TickURL],
        autoplay: false,
        loop: false,
        volume: 0.8
    });

    soundInterval: NodeJS.Timeout = null;
    playSound = (currentBPM: number) => {
        this.stopSound(); // Stop current playback before starting new one

        this.tickSound.play();
        const msRepeatEvery = (60 / currentBPM) * 1000;
        this.soundInterval = setInterval(() => {
            this.tickSound.play();
        }, msRepeatEvery);
    };

    stopSound = () => {
        this.tickSound.stop();
        clearInterval(this.soundInterval);
    };

    onPlayControlClick = () => {
        const {isPlaying, currentBPM} = this.state;
        this.setState({isPlaying: !isPlaying});

        if(!isPlaying) {
            this.playSound(currentBPM);
        } else {
            this.stopSound();
        }
    };

    onBPMClick = (bpm: number) => {
        const {isPlaying} = this.state;
        if(isPlaying) {
            this.playSound(bpm);
        }
        this.setState({currentBPM: bpm});
    };

    render() {
        const {currentBPM, isPlaying} = this.state;
        const matchingSongs: Array<ISong> = songsByBPM[currentBPM] || [];
        const availableBPMs = _.keys(songsByBPM);

        return (
            <div className='metronome-container'>
                <div className='metronome'>
                    <h1 className='title'>Digital Metronome</h1>
                    <MetroAnimation
                        type='oval'
                        bpm={currentBPM}
                        isActive={isPlaying}
                    />
                    <MetroPlayControl isActive={isPlaying} onClick={this.onPlayControlClick} />
                    <MetroBPMControls
                        currentBPM={currentBPM}
                        availableBPMs={availableBPMs}
                        onClick={this.onBPMClick}
                    />
                    <MetroSongsMatchingBPM matchingSongs={matchingSongs} />
                </div>
            </div>
        );
    }
}

export default App;
