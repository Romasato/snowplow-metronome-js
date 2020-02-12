import React from 'react';
import classnames from "classnames";

interface IComponentProps {
    isActive: boolean,
    onClick(): void
}

class MetroPlayControl extends React.Component<IComponentProps, {}> {
    render() {
        const {onClick, isActive} = this.props;
        return (
            <button className={classnames('metronome_button metronome_button--startStop', {
                'metronome_button--active': isActive
            })} onClick={onClick}>{isActive ? 'STOP' : 'START'}</button>
        );
    }
}

export {MetroPlayControl};
