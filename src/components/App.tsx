import React from 'react';
import _ from 'lodash';

import songsBPMs from '../configs/songsBPMs.json';
import {TSongInfoArray} from '../ts-definitions/types';
import {ISongsByBPM, ISong} from '../ts-definitions/interfaces';

import {soundGenerator} from '../utils/soundGenerator';

import {MetroAnimation} from './MetroAnimation';
import {MetroPlayControl} from './MetroPlayControl';
import {MetroBPMControls} from './MetroBPMControls';
import {MetroSongsMatchingBPM} from './MetroSongsMatchingBPM';

import '../styles/components/App.scss';

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

    onPlayControlClick = () => {
        const {isPlaying, currentBPM} = this.state;
        this.setState({isPlaying: !isPlaying});

        if(!isPlaying) {
            soundGenerator.play(currentBPM);
        } else {
            soundGenerator.stop();
        }
    };

    onBPMClick = (bpm: number) => {
        const {isPlaying} = this.state;
        if(isPlaying) {
            soundGenerator.play(bpm);
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
                    <MetroPlayControl
                        isActive={isPlaying}
                        onClick={this.onPlayControlClick}
                    />
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
