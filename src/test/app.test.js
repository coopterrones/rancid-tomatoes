import {render, screen, waitFor, fireEvent, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { apiCalls } from '../apiCalls';
import { _movies } from './mockData/appMockData';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../apiCalls');

describe("App Component", () => {
  
  beforeEach(() => {
    apiCalls.allMovies.mockResolvedValueOnce(_movies);
  });

  describe('getData', () => {

    it('should call allMovies', () => {
      const history = createMemoryHistory();
      render(<Router history={history}><App /></Router>)

      expect(apiCalls.allMovies).toHaveBeenCalledTimes(1);
    })

  })

  it('should render loading', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><App /></Router>)

    const loadingMessage = screen.getByText('Loading page...');

    expect(loadingMessage).toBeInTheDocument();
  })

  it('should load all movies', async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><App /></Router>)

    const mockTitle1 = await waitFor(() => screen.getByText('Money Plane'));
    const mockImgs1 = await waitFor(() => screen.getAllByRole('img'));
    const mockAvgRating1 = await waitFor(() => screen.getByText('Rating: 6.7'));
    const mockReleaseDate1 = await waitFor(() => screen.getByText('Release Date: 2020-09-29'));

    expect(mockTitle1).toBeInTheDocument();
    expect(mockImgs1).toHaveLength(3);
    expect(mockAvgRating1).toBeInTheDocument();
    expect(mockReleaseDate1).toBeInTheDocument();
  })

  it('should load correct url', async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><App /></Router>);
 
    expect(history.location.pathname).toBe("/");
  })

  it('should redirect upon clicking on movie', async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><App /></Router>);

    const mockTitle = await waitFor(() => screen.getByText('Money Plane'));
    fireEvent.click(mockTitle)
    
    expect(history.location.pathname).toEqual('/movie/694919');
  })
});
