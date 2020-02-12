import React from 'react';
import classnames from "classnames";

import '../styles/components/MetroPlayControl.scss';

interface IComponentProps {
    isActive: boolean,
    onClick(): void
}

class MetroPlayControl extends React.Component<IComponentProps, {}> {
    render() {
        const {onClick, isActive} = this.props;
        return (
            <button className={classnames('metro-btn MetroPlayControl', {
                'active': isActive
            })} onClick={onClick}>{isActive ? 'STOP' : 'START'}</button>
        );
    }
}

export {MetroPlayControl};
