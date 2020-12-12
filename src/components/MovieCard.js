import React from 'react';
import '../styles/MovieCard.scss';
import ratingStar from '../assets/rating-star.svg';
import plus from '../assets/plus-symbol.svg';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
  const { id, title, avgRating, releaseDate, posterImg, addToWatchList } = props;
  return (
    <section data-testid={`movie-card-${id}`} id={id} className='movie-card'>
      <Link to={`/movie/${id}`}>
        <section className='movie-img-container'>
          <img src={posterImg} className='poster-img' alt={title} />
        </section>
      </Link>
      <section className='movie-info-container'>
        <img className='add-to-watch-list' src={plus} alt='add-to-watch-list-icon' onClick={() => addToWatchList(id)} />
        <h3 className='movie-card-title'>{title}</h3>
        <section className='average-rating-container'>
          <img className='rating-star-movie-card' src={ratingStar} alt='rating-star-icon' />
          <p className='average-rating-text'>{avgRating}</p>
        </section>
        <section className='realease-date-container'>
          <p className='release-date-text'>{releaseDate[1]} {releaseDate[2]}, {releaseDate[3]} </p>
        </section>
      </section>
    </section>

  )
}

export default MovieCard;
