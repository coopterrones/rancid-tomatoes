import React from 'react';
import '../styles/MovieCard.scss';
import ratingStar from '../assets/rating-star.svg';

const MovieCard = (props) => {
  const {id, title, avgRating, releaseDate, posterImg, handleClick} = props;

  return (
    <section data-testid={`movie-card-${id}`} className='movie-card'id={id} onClick={() => {handleClick(id)}}>
      <section className='movie-img-container'>
        <img src={posterImg} className='poster-img' alt={title}/>
      </section>
      <section className='movie-info-container'>
        <h3 className='movie-card-title'>{title}</h3>
        <section className='average-rating-container'>
          <img className='rating-star-movie-card' src={ratingStar} alt='rating-star-icon'/>
          <p className='average-rating-text'>{avgRating}</p>
        </section>
        <section className='realease-date-container'>
          <p className='release-date-text'>{releaseDate}</p>
        </section>
      </section>
    </section>
  )
}

export default MovieCard;
