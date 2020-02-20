import React from 'react';
import classnames from "classnames";

import '../styles/components/MetroPlayControl.scss';

interface IComponentProps {
    isActive: boolean;
    isDisabled: boolean;
    onClick(): void;
}

class MetroPlayControl extends React.Component<IComponentProps, {}> {
    render() {
        const {onClick, isActive, isDisabled} = this.props;
        return (
            <button className={classnames('metro-btn MetroPlayControl', {
                'active': isActive
            })}
                onClick={onClick}
                disabled={isDisabled}
            >
                {isActive ? 'STOP' : 'START'}
            </button>
        );
    }
}

export {MetroPlayControl};
