import React from 'react';
import '../styles/MovieCard.scss';
import ratingStar from '../assets/rating-star.svg';
import plus from '../assets/plus-symbol.svg';
import minus from '../assets/minus-symbol.svg';
import { Link } from 'react-router-dom';

const MovieCard = ({ movies, addToWatchList, removeFromWatchList }) => {
  return movies.map((movie) => {
    const {
      id,
      title,
      average_rating,
      release_date,
      poster_path,
      onWatchList,
    } = movie;
    const date = new Date(release_date);
    const formattedDate = date.toDateString().split(' ');
    return (
      <section
        data-testid={`movie-card-${id}`}
        id={id}
        className='movie-card'
        key={id}
      >
        <Link to={`/movie/${id}`}>
          <section className='movie-img-container'>
            <img src={poster_path} className='poster-img' alt={title} />
          </section>
        </Link>
        <section className='movie-info-container'>
          <h3 className='movie-card-title'>
            <img
              className='watch-list-icon'
              src={plus}
              alt='add-to-watch-list-icon'
              onClick={() => addToWatchList(id)}
              style={
                onWatchList ? { display: 'none' } : { display: 'inline-block' }
              }
            />
            <img
              className='watch-list-icon'
              src={minus}
              alt='remove-from-watch-list-icon'
              onClick={() => removeFromWatchList(id)}
              style={
                onWatchList ? { display: 'inline-block' } : { display: 'none' }
              }
            />
            {title}
          </h3>
          <section className='average-rating-container'>
            <img
              className='rating-star-movie-card'
              src={ratingStar}
              alt='rating-star-icon'
            />
            <p className='average-rating-text'>{average_rating.toFixed(1)}</p>
          </section>
          <section className='realease-date-container'>
            <p className='release-date-text'>
              {formattedDate[1]} {formattedDate[2]}, {formattedDate[3]}{' '}
            </p>
          </section>
        </section>
      </section>
    );
  });
};

export default MovieCard;
