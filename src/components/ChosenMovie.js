import React from 'react';
import '../styles/ChosenMovie.scss';

const ChosenMovie = ({movie, displayAllMovies}) => {
  let genres;
  //this is temp condition before fetch real data
  if (movie.genres) {
    genres = movie.genres.map(genre => <p key={genre}>{genre} </p>) ;
  } else {
    genres = []
  }

  return (
    <section className='chosen-movie'>
      <section className='backdrop-img'>
        <img src={movie.backdrop_path} alt={movie.title}/>
      </section>
      <section>
        <h3>{movie.title}</h3>
        <section className='numeric-info'>
          <p>Rating: {movie.average_rating.toFixed(1)}</p>
          <p>Runtime: {movie.runtime}</p>
          <p>Release Date: {movie.release_date}</p>
        </section>
        
        <p>Overview: {movie.overview}</p>

        <section className='genre'>{genres}</section>
        <section className='monetary-info'>
          <p>Budget: ${movie.budget}</p>
          <p>Revenue: ${movie.revenue}</p>
        </section>
        
        
        <p>Tagline: {movie.tagline}</p>
      </section>
      <button onClick={displayAllMovies}>Go Back</button>
    </section>
  )
}

export default ChosenMovie