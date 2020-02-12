import React from 'react';

interface IComponentProps {
    type: string,
    bpm: number,
    isActive: boolean
}

class MetroAnimation extends React.Component<IComponentProps, {}> {
    render() {
        const {bpm, isActive} = this.props;
        const animationDuration = 60 / bpm;

        return (
            <div className='metroAnimation'>
                <div className='metroAnimation--oval'>
                    <div className='oval__outer' style={{
                        animationDuration: `${isActive ? animationDuration : 0}s`
                    }} />
                    <div className='oval__inner'>
                        {bpm !== undefined ? bpm : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export {MetroAnimation};
