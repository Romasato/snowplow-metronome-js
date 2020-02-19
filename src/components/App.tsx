import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';

import {ISongsByBPM, ISong, IAppState} from '../ts-definitions/interfaces';

import {SoundGenerator} from '../utils/SoundGenerator';
import {setBPM, metroStart, metroStop} from '../stores/actions';

import {MetroAnimation} from './MetroAnimation';
import {MetroPlayControl} from './MetroPlayControl';
import {MetroBPMControls} from './MetroBPMControls';
import {MetroSongsMatchingBPM} from './MetroSongsMatchingBPM';

import '../styles/components/App.scss';

interface IComponentProps {
    currentBPM: number;
    isPlaying: boolean;
    songsByBPM: ISongsByBPM,
    setNewBPM(newBPM: number): void;
    metroStart(): void;
    metroStop(): void;
};

interface IComponentState {
    currentBPM: number,
    isPlaying: boolean
}

const mapStateToProps = (state: IAppState) => {
    return {
        currentBPM: state.currentBPM,
        isPlaying: state.isPlaying,
        songsByBPM: state.songsByBPM
    }
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setNewBPM: (newBPM: number) => {
            dispatch(setBPM(newBPM));
        },
        metroStart: () => {
            dispatch(metroStart());
        },
        metroStop: () => {
            dispatch(metroStop());
        }
    };
};

const stateConnector = connect(mapStateToProps, mapDispatchToProps);

type TComponentProps = ConnectedProps<typeof stateConnector> & IComponentProps;

/**
 * Main app component
 */
class App extends React.Component<TComponentProps, IComponentState> {
    soundGenerator: SoundGenerator = null;

    // We have to instantiate sound on user action - otherwise Firefox complains
    checkInitSoundGenerator = () => {
        if(!this.soundGenerator) {
            this.soundGenerator = new SoundGenerator();
        }
    };

    onPlayControlClick = () => {
        const {isPlaying, currentBPM, metroStart, metroStop} = this.props;

        this.checkInitSoundGenerator();

        if(!isPlaying) {
            metroStart();
            this.soundGenerator.play(currentBPM);
        } else {
            metroStop();
            this.soundGenerator.stop();
        }
    };

    onBPMClick = (bpm: number) => {
        const {setNewBPM, isPlaying} = this.props;

        if(isPlaying) {
            this.checkInitSoundGenerator();
            this.soundGenerator.play(bpm);
        }
        setNewBPM(bpm);
    };

    render() {
        const {currentBPM, isPlaying, songsByBPM} = this.props;
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

export default stateConnector(App);
