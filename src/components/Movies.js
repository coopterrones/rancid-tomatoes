import React from 'react';
import MovieCard from './MovieCard';
import '../styles/Movie.scss';

const Movies = ({movies}) => {
  const movieCards = movies.map((movie) => {
    // const originalDate = movie.release_date;
    // const splitDate = originalDate.split('-');
    // const month = splitDate[1];
    // const day = splitDate[2];
    // const year = splitDate[0];
    // const formattedDate = `${month}-${day}-${year}`;
    const date = new Date(movie.release_date);
      const chosenDate = date.toDateString().split(' ');
      const formattedDate = chosenDate.slice(1, 4);
      console.log(chosenDate);
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
