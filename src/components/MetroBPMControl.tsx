import React from 'react';
import classnames from 'classnames';

interface IComponentProps {
    bpm: number,
    isCurrent: boolean,
    onClick(bpm: number): any
}

class MetroBPMControl extends React.Component<IComponentProps, any> {
    onClick = () => {
        const {onClick, bpm} = this.props;
        onClick(bpm);
    };

    render() {
        const {bpm, isCurrent} = this.props;

        return (
            <button onClick={this.onClick} className={classnames('metronome_button', {
                'metronome_button--active': isCurrent
            })}>
                {`${bpm} BPM`}
            </button>
        );
    }
}

export {MetroBPMControl};
