import React, { Component } from 'react';
import SearchBar from '../components/search-bar';
import VideoList from '../components/video-list';
import axios from 'axios';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import '../styles/style.css'

const API_KEY = "api_key=d8f987b1fffbdab9d3f84b0b70f5291a";
const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {movieList:{}, currentMovie:{}}
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then((res) => {
      this.setState({movieList:res.data.results.slice(1,6), currentMovie:res.data.results[0]}, function() {
        this.applyVideoToCurrentMovie()
      });
    })
  }

  applyVideoToCurrentMovie() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?append_to_response=videos&include_adult=false&${API_KEY}`).then((res) => {
      // console.log(res);
      if(res.data.videos.results[0]) { 
        const youtubeKey = res.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey;
        this.setState({currentMovie: newCurrentMovieState});
        // console.log(this.state.currentMovie);
      }
    })
  }

  //Ici, on rappel la fonction applyVideoToCurrentMovie pour être sur que notre state sera mis à jour
  onClickListItem = (movie) => {
    this.setState({currentMovie: movie}, function() {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    })
  }

  onClickSearch = (searchText) => {
    if(searchText){ 
      axios.get(`${API_END_POINT}${SEARCH_URL}&query=${searchText}&${API_KEY}`).then(
        res => {
          if(res.data && res.data.results[0]){
            if(res.data.results[0].id !== this.state.currentMovie.id){
              this.setState({currentMovie: res.data.results[0]}, () => {
                this.applyVideoToCurrentMovie();
                this.setRecommendation();
              });
            }
          }
        }
      )
    }
  }

  setRecommendation = () => {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?language=fr&${API_KEY}`).then(
      res => {
        this.setState({movieList: res.data.results.slice(0,5)})
      }
    )
  }

  render() { 

    const renderVideoList = () => {
      if(this.state.movieList.length >= 5){
        return <VideoList movieList={this.state.movieList} callback={this.onClickListItem}/>
      }
    }


    
    // console.log(this.state);
    return (
      <div className="App">
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
