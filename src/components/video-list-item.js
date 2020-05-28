import React from 'react';

//ES6 : {movie} == 
//let movie = props.movie 
const VideoListItem = props => {

    const {movie} = props;

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    const handleOnclick  = () => {
        props.callback(movie);
    }

    return ( 
        <li className="list-group-item" onClick={handleOnclick}>
            <div className="media">
                <div className="media-left">
                    <img className="media-object rounded" height="100px" width="100px" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt="video"/>
                </div>

                <div className="media-body">
                    <h5 className="title_list_item">{movie.title}</h5>
                </div>
            </div>
        </li>
    )

}

export default VideoListItem;