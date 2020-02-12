import React from 'react';
import {ISong} from '../ts-definitions/interfaces';

interface IComponentProps {
    matchingSongs: Array<ISong>
};

class MetroSongsMatchingBPM extends React.Component<IComponentProps, {}> {
    render() {
        const {matchingSongs} = this.props;
        return (
            <div className='matching-songs'>
                {matchingSongs.length && (
                        <>
                            <div className='matching-songs__header'>
                                Songs that use this BPM:
                            </div>
                            <ul className='matching-songs__list'>
                                {matchingSongs.map(({title, artist}, idx) => (
                                        <li
                                            className='matching-songs__song'
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
