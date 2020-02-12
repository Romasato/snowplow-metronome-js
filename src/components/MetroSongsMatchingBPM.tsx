import React from 'react';

import '../styles/components/MetroSongsMatchingBPM.scss';
import {ISong} from '../ts-definitions/interfaces';

interface IComponentProps {
    matchingSongs: Array<ISong>
};

class MetroSongsMatchingBPM extends React.Component<IComponentProps, {}> {
    render() {
        const {matchingSongs} = this.props;
        return (
            <div className='MetroSongsMatchingBPM'>
                {matchingSongs.length && (
                        <>
                            <div className='MetroSongsMatchingBPM__header'>
                                Songs that use this BPM:
                            </div>
                            <ul className='MetroSongsMatchingBPM__list'>
                                {matchingSongs.map(({title, artist}, idx) => (
                                        <li
                                            className='MetroSongsMatchingBPM__song'
                                            key={`${idx}_${artist}_${title}`}
                                        >
                                            {artist} - {title}
                                        </li>
                                    )
                                )}
                            </ul>
                        </>
                )}
            </div>
        );
    }
}

export {MetroSongsMatchingBPM};
