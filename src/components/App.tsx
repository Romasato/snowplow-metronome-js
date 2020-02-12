import React, {Component, SyntheticEvent} from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import CONFIG from '../config.json';
import {BPMControl} from "./BPMControl";
import {Howl} from 'howler';
import mp3TickURL from '../assets/audio/tick.mp3';
import Timeout = NodeJS.Timeout;

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

const songsByBPM = CONFIG.songsBPMs.reduce<ISongsByBPM>((objBPM: any, song: Array<any>) => {
    const [title, artist, bpm] = song;
    if(bpm === undefined) { return objBPM; };
    if(!objBPM[bpm]) {
        objBPM[bpm] = [];
    }

    objBPM[bpm].push({artist, title});
    return objBPM;
}, {} as ISongsByBPM);

interface IState {
    currentBPM: number,
    isPlaying: boolean
}

var tickSound = new Howl({
    src: [mp3TickURL],
    autoplay: false,
    loop: false,
    volume: 0.8
});

class App extends Component<any, IState> {
    state = {
        currentBPM: +_.keys(songsByBPM)[0],
        isPlaying: false
    };

    soundInterval: Timeout = null;
    playSound = (currentBPM: number) => {
        this.stopSound(); // Stop current playback before starting new one

        setTimeout(() => {
            tickSound.play();
            this.soundInterval = setInterval(() => {
                tickSound.play();
            }, (60 / currentBPM) * 1000);
        }, 300);
    };

    stopSound = () => {
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
        console.warn({bpm});
        const {isPlaying} = this.state;
        if(isPlaying) {
            this.playSound(bpm);
        }
        this.setState({currentBPM: bpm});
    };

    render() {
        const {currentBPM, isPlaying} = this.state;
        const matchingSongs: Array<ISong> = songsByBPM[currentBPM] || [];

        return (
            <div className='metronome-container'>
                <div className='metronome'>
                    <h1 className='title'>Digital Metronome</h1>

                    <div className='graphvis'>
                        <div className='graphvis--oval'>
                            <div className='oval__outer' style={{
                                animationDuration: `${isPlaying ? (60 / currentBPM) : 0}s`
                            }} />
                            <div className='oval__inner'>{currentBPM}</div>
                        </div>
                    </div>
                    <button className={classnames('metronome_button metronome_button--startStop', {
                        'metronome_button--active': isPlaying
                    })} onClick={this.onPlayControlClick}>{isPlaying ? 'STOP' : 'START'}</button>
                    <div className='bpm-selector'>
                        <ul className='bpm-selector__buttons'>
                            {_.map(songsByBPM, (song: string, bpm: number) => {
                                return (
                                    <BPMControl key={bpm} bpm={bpm} isCurrent={+bpm === currentBPM} onClick={this.onBPMClick.bind(this, +bpm)} />
                                );
                            })}
                        </ul>
                    </div>
                    {matchingSongs.length && (
                        <div className='matching-songs'>
                            <div className='matching-songs__header'>Songs that use this BPM:</div>
                            <ul>
                                {matchingSongs.map(({title, artist}, idx) => (
                                        <li key={`${idx}_${artist}_${title}`}>{artist} - {title}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
