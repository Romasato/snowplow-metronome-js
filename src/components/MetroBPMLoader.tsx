import React from 'react';
import * as Respinner from 'respinner';

import '../styles/components/MetroBPMLoader.scss';

const MetroBPMLoader = () => {
    return (
        <div className='bpm-loader'>
            <div className='bpm-loader__spinner'>
                <Respinner.BeatLoading fill='#FAFAFA'/>
            </div>
            <div className='bpm-loader__msg'>
                Loading BPMs...
            </div>
        </div>
    );
};

export {MetroBPMLoader};
