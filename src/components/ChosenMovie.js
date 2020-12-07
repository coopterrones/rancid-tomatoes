import React, { Component } from 'react';
import '../styles/ChosenMovie.scss';
import backButton from '../assets/back-button.svg';
import ratingStar from '../assets/rating-star.svg';
import runtimeReel from '../assets/runtime-reel.svg';
import { apiCalls } from '../apiCalls';
import { Link } from 'react-router-dom';

class ChosenMovie extends Component {
  constructor() {
    super();
    this.state = {
      movie: null,
      video: null
    }
  }
 
  componentDidMount() {
    const { id } = this.props.match.params;
    return Promise.all([apiCalls.selectMovie(id), apiCalls.selectVideo(id)])
      .then(data => {
        const chosenMovie = data.reduce((chosenMovieData, eachDataset) => {
          return chosenMovieData = {...chosenMovieData, ...eachDataset}
        }, {}) 
        this.setState({
          movie: chosenMovie.movie,
          video: chosenMovie.videos[0]
        })
      })
  }

  render() {  
    if(this.state.movie) {
      const { movie, video } = this.state;
      const genres = movie.genres.map(genre => <p key={genre}>{genre} </p>)
      return (
        <section className='chosen-movie' data-testid='chosen-movie'>
        <section className='backdrop-img'style={{ backgroundImage: `linear-gradient(to right, black, 55%, transparent), url(${movie.backdrop_path})`}}>
          <section className="movie-info">
            <Link to='/'>
              <img data-testid='return-btn' className="back-button-icon" src={backButton} alt='back-button-icon'onClick={displayAllMovies}/>
            </Link>
            <h3>{movie.title}</h3>
          <section className='numeric-info'>
            <p className='rating-text'><img className='rating-star' src={ratingStar} alt='rating-star-icon'/> {movie.average_rating.toFixed(1)}</p>
            <p className='runtime-text'><img className='runtime-reel' src={runtimeReel} alt='runtime-reel-icon'/>{movie.runtime}min.</p>
            <p className='release-date-text'>{movie.release_date}</p>
          </section>
          <p className='overview-text' data-testid='overview'>Overview: {movie.overview}</p>
          <section className='genre' data-testid='genre'>{genres}</section>
          <section className='monetary-info'>
            <p className='budget-text'>Budget: ${movie.budget}</p>
            <p className='revenue-text'>Revenue: ${movie.revenue}</p>
          </section>
          <p>Tagline: {movie.tagline}</p>
          </section>
          <section className="video-frame">
            <iframe className="video-container"src={`https://youtube.com/embed/${video.key}`} alt='trailer-iframe-video-player' title='trailer-video-player' height="400" width="700"></iframe>
              </section>
          </section>
        </section>
      )
   } else {
    return (<p className='chosen-movie-loading-screen'>Loading... </p>)
   }
  }
}

export default ChosenMovie
