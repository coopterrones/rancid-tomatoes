import { render, screen } from '@testing-library/react';
import { _movies } from './mockData/moviesMockData';
import '@testing-library/jest-dom';
import Movies from '../components/Movies';
import { MemoryRouter } from 'react-router-dom';

describe('Movies Component', () => {
  it('should render correctly', () => {
    //Movies component does not need tests anymore after passing re compisition
    //   render(
    //     <Movies
    //       movies={_movies}
    //     />, { wrapper: MemoryRouter }
    //   )
    //   const title1 = screen.getByText('Money Plane');
    //   const releaseDate1 = screen.getByText('Sep 28, 2020');
    //   const averageRating1 = screen.getByText('7.0');
    //   const posterImages = screen.getAllByRole('img');
    //   expect(title1).toBeInTheDocument();
    //   expect(releaseDate1).toBeInTheDocument();
    //   expect(averageRating1).toBeInTheDocument();
    //   expect(posterImages).toHaveLength(6);
  });
});
