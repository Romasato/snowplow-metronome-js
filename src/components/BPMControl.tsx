import React from 'react';
import classnames from "classnames";

interface IMyComponentProps {
    bpm: number,
    isCurrent: boolean,
    onClick(): any
}

class BPMControl extends React.Component<IMyComponentProps, any> {
    render() {
        const {bpm, isCurrent, onClick} = this.props;

        return (
            <button onClick={onClick} className={classnames('metronome_button', {
                'metronome_button--active': isCurrent
            })}>
                {`${bpm} BPM`}
            </button>
        );
    }
}

export {BPMControl};
