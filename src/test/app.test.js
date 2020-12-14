import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import { apiCalls } from '../apiCalls';
import { _movies } from './mockData/appMockData';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../apiCalls');

describe("App Component", () => {
  beforeEach(() => {
    apiCalls.allMovies.mockResolvedValueOnce(_movies);
    apiCalls.getWatchList.mockResolvedValueOnce({ "watchListIds": [] });
  });
  describe('getData', () => {
    it('should call allMovies', () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)
      expect(apiCalls.allMovies).toHaveBeenCalledTimes(1);
    })
    it('should render loading', () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)
      const loadingMessage = screen.getByText('Loading...');
      expect(loadingMessage).toBeInTheDocument();
    })
    it('should load all movies', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)
      const mockTitle1 = await waitFor(() => screen.getByText('Money Plane'));
      const mockImgs1 = await waitFor(() => screen.getAllByRole('img'));
      const mockAvgRating1 = await waitFor(() => screen.getByText('6.7'));
      const mockReleaseDate1 = await waitFor(() => screen.getByText('Aug 19, 2020'));
      expect(mockTitle1).toBeInTheDocument();
      expect(mockImgs1).toHaveLength(10);
      expect(mockAvgRating1).toBeInTheDocument();
      expect(mockReleaseDate1).toBeInTheDocument();
    })
    it('should load correct url', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>);
      expect(history.location.pathname).toBe("/");
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
      expect(title).toBeInTheDocument();
      expect(rating).toBeInTheDocument();
      expect(releaseDate).toBeInTheDocument();
    })
  })
  describe('Chosen movie', () => {
    it('should redirect upon clicking on movie', async () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>);
      const mockImg = await waitFor(() => screen.getByAltText('Money Plane'));
      userEvent.click(mockImg)
      expect(history.location.pathname).toEqual('/movie/694919');

    })
  })
});