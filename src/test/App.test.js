import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import { apiCalls } from '../apiCalls';
import { _movies } from './mockData/appMockData';
import { _movie, _video } from '../test/mockData/chosenMovieMockData';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../apiCalls');

describe("App Component", () => {

  beforeEach(() => {
    apiCalls.allMovies.mockResolvedValueOnce(_movies);
    apiCalls.getWatchList.mockResolvedValueOnce({ "watchListIds": [694919, 718444] });
  });

  describe('getData', () => {

    it('should call allMovies', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)
      await waitFor(() => expect(apiCalls.allMovies).toHaveBeenCalledTimes(1));
    })

    it('should render loading', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)
      const loadingMessage = screen.getByText('Loading...');
      await waitFor(() => expect(loadingMessage).toBeInTheDocument());
    })

    it('should load all movies', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)

      await waitFor(() => expect(screen.getByText('Money Plane')).toBeInTheDocument());
      await waitFor(() => expect(screen.getAllByRole('img')[0]).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('6.7')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Aug 19, 2020')).toBeInTheDocument());
    })

    it('should load correct url', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>);
      await waitFor(() => expect(history.location.pathname).toBe("/"));
    })

  })
  describe('Nav section', () => {

    it('should display correct movie upon searching', async () => {
      render(<App />, { wrapper: MemoryRouter });
      const searchInput = await waitFor(() => screen.getByPlaceholderText('MOVIE NAME'));
      const submitBtn = await waitFor(() => screen.getAllByRole('button')[0]);
      userEvent.type(searchInput, 'Mulan');
      userEvent.click(submitBtn);
      const title = await waitFor(() => screen.getByText('Mulan'));
      const rating = await waitFor(() => screen.getByText(4.9))
      const releaseDate = await waitFor(() => screen.getByText('Sep 03, 2020'))
      const title2 = await waitFor(() => screen.queryByText('Money Plane'));
      const title3 = await waitFor(() => screen.queryByText('Rogue'));
      expect(title).toBeInTheDocument();
      expect(rating).toBeInTheDocument();
      expect(releaseDate).toBeInTheDocument();
      expect(title2).not.toBeInTheDocument();
      expect(title3).not.toBeInTheDocument();
    })

    it('should be able to sort movies by date newest to oldest', async () => {
      render(<App />, { wrapper: MemoryRouter });
      const sortButton = await waitFor(() => screen.getByText('Newest - Oldest'));
      userEvent.click(sortButton);

      const movieTitles = await waitFor(() => screen.getAllByRole('heading'));

      await waitFor(() => expect(movieTitles[0]).toHaveTextContent('Money Plane'))
      await waitFor(() => expect(movieTitles[1]).toHaveTextContent('Mulan'));
      await waitFor(() => expect(movieTitles[2]).toHaveTextContent('Rogue'));
    })

    it('should be able to sort movies by date oldest to newest', async () => {
      render(<App />, { wrapper: MemoryRouter });

      const sortButton = await waitFor(() => screen.getByText('Newest - Oldest'));
      userEvent.click(sortButton);
      userEvent.click(sortButton);

      const movieTitles = await waitFor(() => screen.getAllByRole('heading'));

      await waitFor(() => expect(movieTitles[0]).toHaveTextContent('Rogue'));
      await waitFor(() => expect(movieTitles[1]).toHaveTextContent('Mulan'));
      await waitFor(() => expect(movieTitles[2]).toHaveTextContent('Money Plane'));
    })
  })

  describe('Watch List', () => {

    it('should render movies on watch list', async () => {
      render(<App />, { wrapper: MemoryRouter });
      const watchListButton = await waitFor(() => screen.getByText('Watch List'))
      userEvent.click(watchListButton);

      expect(screen.getByText('Money Plane')).toBeInTheDocument();
      expect(screen.getByText('Rogue')).toBeInTheDocument();
      expect(screen.queryByText('Mulan')).not.toBeInTheDocument();
    })

    it('should be able to add a movie to watch list', async () => {
      render(<App />, { wrapper: MemoryRouter });
      const addButtons = await waitFor(() => screen.getAllByAltText('add-to-watch-list-icon'));
      const watchListButton = await waitFor(() => screen.getByText('Watch List'));

      apiCalls.addToWatchList.mockResolvedValueOnce({ "watchListIds": [694919, 718444, 337401] });
      apiCalls.getWatchList.mockResolvedValueOnce({ "watchListIds": [694919, 718444, 337401] });

      userEvent.click(addButtons[1]);
      userEvent.click(watchListButton);

      await waitFor(() => expect(screen.getByText('Mulan')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Money Plane')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Rogue')).toBeInTheDocument());
    })

    it('should be able to remove movies from watch list', async () => {
      render(<App />, { wrapper: MemoryRouter });
      const removeButtons = await waitFor(() => screen.getAllByAltText('remove-from-watch-list-icon'))
      const watchListButton = await waitFor(() => screen.getByText('Watch List'))

      apiCalls.removeFromWatchList.mockResolvedValueOnce({ "watchListIds": [718444, 337401] })
      apiCalls.getWatchList.mockResolvedValueOnce({ "watchListIds": [718444, 337401] })

      userEvent.click(removeButtons[0]);
      userEvent.click(watchListButton);

      await waitFor(() => expect(screen.queryByText('Money Plane')).not.toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Mulan')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Rogue')).toBeInTheDocument());
    })
  })

  describe('Chosen movie', () => {

    it('should redirect upon clicking on movie', async () => {
      apiCalls.selectMovie.mockResolvedValueOnce(_movie);
      apiCalls.selectVideo.mockResolvedValueOnce(_video);
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>);

      const mockImg = await waitFor(() => screen.getByAltText('Money Plane'));
      userEvent.click(mockImg)

      await waitFor(() => expect(history.location.pathname).toEqual('/movie/694919'));
    })

  })

});
