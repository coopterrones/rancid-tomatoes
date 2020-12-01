import React from 'react';
import MovieCard from './MovieCard';

const Movies = ({movies}) => {
  const movieCards = movies.movies.map((movie) => {
    return (
      <MovieCard
        title={movie.title}
        avgRating={movie.average_rating}
        releaseDate={movie.release_date}
        posterImg={movie.poster_path}
        key={movie.id}
      />
    )
  })
  return (
    <div className='movies-container'>
      {movieCards}
    </div>
  )
}

export default Movies;
