import React from 'react';

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
      <section>
        <img src={movie.poster_path} className='poster-img' alt={movie.title}/>
        <img src={movie.backdrop_path} className='poster-img' alt={movie.title}/>
      </section>
      <section>
        <h3>{movie.title}</h3>
        <p>Rating: {movie.average_rating.toFixed(1)}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>
        <section>Genres: {genres}</section>
        <p>Budget: {movie.budget}</p>
        <p>Revenue: {movie.revenue}</p>
        <p>Runtime: {movie.runtime}</p>
        <p>Tagline: {movie.tagline}</p>
      </section>
      <button onClick={displayAllMovies}>Go Back</button>
    </section>
  )
}

export default ChosenMovie