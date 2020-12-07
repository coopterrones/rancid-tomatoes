import React from 'react';
import '../styles/MovieCard.scss';
import ratingStar from '../assets/rating-star.svg';
import { NavLink } from 'react-router-dom';

const MovieCard = (props) => {
  const {id, title, avgRating, releaseDate, posterImg} = props;
  return (
    <NavLink to={`/movie/${id}`} className='movie-card'>
      <section data-testid={`movie-card-${id}`} id={id}>
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
    </NavLink>
  )
}

export default MovieCard;
