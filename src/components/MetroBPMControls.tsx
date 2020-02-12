import React from 'react';
import _ from 'lodash';

import {MetroBPMControl} from './MetroBPMControl';
import '../styles/components/MetroBPMControls.scss';

interface IComponentProps {
    currentBPM: number,
    availableBPMs: Array<string>,
    onClick?(newBPM: number): any
};

class MetroBPMControls extends React.Component<IComponentProps, {}> {
    onClickControl = (newBPM: number) => {
        const {onClick} = this.props;
        if(onClick) {
            onClick(newBPM);
        }
    };

    render() {
        const {availableBPMs, onClick, currentBPM} = this.props;

        return (
            <div className='MetroBPMControls'>
                <div className='MetroBPMControls__buttons'>
                    {_.map(availableBPMs, (bpm: string) =>
                         (
                            <MetroBPMControl
                                key={bpm}
                                bpm={+bpm}
                                isCurrent={+bpm === currentBPM}
                                onClick={this.onClickControl}
                            />
                        )
                    )}
                </div>
            </div>
        );
    }
}

export {MetroBPMControls};
