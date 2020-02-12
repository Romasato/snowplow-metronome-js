import React from 'react';
import classnames from 'classnames';

import '../styles/components/MetroBPMControl.scss';

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
            <button onClick={this.onClick} className={classnames('metro-btn MetroBPMControl', {
                'metro-btn--active': isCurrent
            })}>
                {`${bpm} BPM`}
            </button>
        );
    }
}

export {MetroBPMControl};
