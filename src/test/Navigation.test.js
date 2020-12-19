import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../components/Navigation';
import { _movies } from './mockData/moviesMockData';
import { createMemoryHistory } from 'history';

describe('Navigation component', () => {

  describe('HandleClick method', () => {

    it('should render correctly', () => {
      render(<Navigation />, { wrapper: MemoryRouter }
      )

      const searchInput = screen.getByPlaceholderText('MOVIE NAME');
      const submitBtn = screen.getByText('search')
      const sortBtn = screen.getByText('Newest - Oldest')

      expect(searchInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
      expect(sortBtn).toBeInTheDocument();
    })

    it('should change sort button name once clicked', () => {
      render(<Navigation
        sortMovies={jest.fn()}
        sortStatus={'false'}
      />, { wrapper: MemoryRouter }
      )

      const sortBtn = screen.getAllByRole('button')[1];
      userEvent.click(sortBtn);

      const unsortBtn = screen.getByText('Oldest - Newest');
      expect(unsortBtn).toBeInTheDocument();
    })

    it('should call getSearchedMovies', () => {
      const mockSortMovies = jest.fn()
      render(<Navigation
        movies={_movies}
        getSearchedMovies={jest.mock()}
        sortMovies={mockSortMovies}
        sortStatus={'false'}
      />, { wrapper: MemoryRouter }
      )
      const sortBtn = screen.getAllByRole('button')[1];
      userEvent.click(sortBtn);

      expect(mockSortMovies).toBeCalled();
    })
  })

  describe('HandleOnChange method', () => {

    it('should change input value once inputing', () => {
      render(<Navigation
        movies={_movies}
        getSearchedMovies={jest.fn()}
      />, { wrapper: MemoryRouter }
      )

      const searchInput = screen.getByPlaceholderText('MOVIE NAME');
      userEvent.type(searchInput, 'mulan');

      expect(searchInput).toHaveValue('mulan');
    })

    it('should change input value to lowercase', () => {
      render(<Navigation
        movies={_movies}
        getSearchedMovies={jest.fn()}
      />, { wrapper: MemoryRouter }
      )

      const searchInput = screen.getByPlaceholderText('MOVIE NAME');

      userEvent.type(searchInput, 'Rapanzel');

      expect(searchInput).toHaveValue('rapanzel');
    })

  })

  describe('HandleSubmit method', () => {

    it('should clear input filed after submitting', () => {
      render(<Navigation
        movies={_movies}
        getSearchedMovies={jest.fn()}
      />, { wrapper: MemoryRouter }
      )

      const submitBtn = screen.getByText('search')
      const searchInput = screen.getByPlaceholderText('MOVIE NAME');
      userEvent.type(searchInput, "Elle's Money Plane");
      userEvent.click(submitBtn);

      expect(searchInput).toHaveValue('');
    })

    it('should call getSearchedMovies with correct movie', () => {
      const mockSortMovies = jest.fn()
      render(<Navigation
        movies={_movies}
        getSearchedMovies={mockSortMovies}
      />, { wrapper: MemoryRouter }
      )

      const submitBtn = screen.getByText('search')
      const searchInput = screen.getByPlaceholderText('MOVIE NAME');
      userEvent.type(searchInput, "Elle's Money Plane");
      userEvent.click(submitBtn);

      expect(mockSortMovies).toHaveBeenCalledWith([_movies[1]]);
    })

    it('should call getSearchedMovies with correct movies', () => {
      const mockSortMovies = jest.fn()
      render(<Navigation
        movies={_movies}
        getSearchedMovies={mockSortMovies}
      />, { wrapper: MemoryRouter }
      )

      const submitBtn = screen.getByText('search')
      const searchInput = screen.getByPlaceholderText('MOVIE NAME');
      userEvent.type(searchInput, "Plane");
      userEvent.click(submitBtn);

      expect(mockSortMovies).toHaveBeenCalledWith(_movies);
    })

    describe('watch list route', () => {

      it('should render the watch list on click', () => {
        const history = createMemoryHistory();
        render(<Router history={history}><Navigation /></Router>)

        const watchListButton = screen.getByText('Watch List');
        userEvent.click(watchListButton);

        expect(history.location.pathname).toBe('/watch-list');
      })

    })

  })

})
