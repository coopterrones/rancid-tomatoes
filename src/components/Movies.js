import React from 'react';
import MovieCard from './MovieCard';
import '../styles/Movie.scss';

const Movies = ({movies}) => {
  const movieCards = movies.map((movie) => {
    const date = new Date(movie.release_date);
      const formattedDate = date.toDateString().split(' ');
    return (
      <MovieCard
        id={movie.id}
        title={movie.title}
        avgRating={movie.average_rating.toFixed(1)}
        releaseDate={formattedDate}
        posterImg={movie.poster_path}
        key={movie.id}
      />
    )
  })
  return (
    <section className='movies-container'>
      {movieCards}
    </section>
  )
}

export default Movies;
