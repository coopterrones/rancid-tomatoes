import React from 'react';
import '../styles/ChosenMovie.scss';
import backButton from '../assets/back-button.svg';

const ChosenMovie = ({movie, video, displayAllMovies}) => {
  let genres = movie.genres.map(genre => <p key={genre}>{genre} </p>)

  return (
    <section className='chosen-movie' data-testid='chosen-movie'>
      <section className='backdrop-img'style={{ backgroundImage: `linear-gradient(to right, black, 55%, transparent), url(${movie.backdrop_path})`}}>
        <section className="movie-info">
          <img data-testid='return-btn' className="back-button-icon" src={backButton} onClick={displayAllMovies}/>
          <h3>{movie.title}</h3>
        <section className='numeric-info'>
          <p>Rating: {movie.average_rating.toFixed(1)}</p>
          <p>Runtime: {movie.runtime}</p>
          <p>Release Date: {movie.release_date}</p>
        </section>
        <p data-testid='overview'>Overview: {movie.overview}</p>
        <section className='genre' data-testid='genre'>{genres}</section>
        <section className='monetary-info'>
          <p>Budget: ${movie.budget}</p>
          <p>Revenue: ${movie.revenue}</p>
        </section>
        <p>Tagline: {movie.tagline}</p>
        </section>
        <section className="video-frame">
          <iframe className="video-container"src={`https://youtube.com/embed/${video.key}`} height="400" width="700"></iframe>
        </section>
      </section>
    </section>
  )
}

export default ChosenMovie
