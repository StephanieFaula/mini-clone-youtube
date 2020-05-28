import React from 'react';
import VideoListItem from './video-list-item';

const VideoList = props => {

    let movieList = props.movieList
    const receiveCallback = (movie) => {
        console.log('parent : ',movie)
        props.callback(movie)
    }

    return (
        <div>
            {movieList && 
            <ul>
                {movieList.map( movie => ( 
                    <VideoListItem movie={movie} key={movie.id} callback={receiveCallback} />
                ))}
            </ul>
            }
        </div>
    );
}

export default VideoList;