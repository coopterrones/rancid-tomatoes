import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../components/Navigation';
import { _movies } from './mockData/moviesMockData';
import { _movie } from './mockData/chosenMovieMockData';

describe('Navigation component', () => {

  describe('HandleClick method', () => {

    it('should render correctly', () => {
      render(<Navigation
        movies={_movies}
        getStoredMovies={jest.fn()}
      />, { wrapper: MemoryRouter }
      )

      const searchInput = screen.getByPlaceholderText('MOVIE NAME');
      const submitBtn = screen.getByText('search')
      const sortBtn = screen.getByText('Recent Releases')

      expect(searchInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
      expect(sortBtn).toBeInTheDocument();
    })

  })

})
