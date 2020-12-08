import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { apiCalls } from '../apiCalls';
import { _movies } from './mockData/appMockData';
jest.mock('../apiCalls');

describe("App Component", () => {

  beforeEach(() => {
    apiCalls.allMovies.mockResolvedValueOnce(_movies);
  });

  

  // it('should load all movies', async() => {
  //   render(
  //     <App/>
  //   );

  //   const mockTitle1 = await waitFor(() => screen.getByText('Money Plane'));
  //   const mockImgs1 = await waitFor(() => screen.getAllByRole('img'));
  //   const mockAvgRating1 = await waitFor(() => screen.getByText('Rating: 6.7'));
  //   const mockReleaseDate1 = await waitFor(() => screen.getByText('Release Date: 2020-09-29'));

  //   expect(mockTitle1).toBeInTheDocument();
  //   expect(mockImgs1).toHaveLength(3);
  //   expect(mockAvgRating1).toBeInTheDocument();
  //   expect(mockReleaseDate1).toBeInTheDocument();
  // })

  // it('should display a single movie when chosen', async() => {
  //   apiCalls.selectMovie.mockResolvedValueOnce(
  //     {
  //       movie:
  //       {
  //         "id":337401,
  //         "title":"Mulan",
  //         "poster_path":"https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
  //         "backdrop_path":"https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
  //         "release_date":"2020-09-04","overview":"When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.",
  //         "genres":["Action","Adventure","Drama","Fantasy"],
  //         "budget":200000000,
  //         "revenue":57000000,
  //         "runtime":115,
  //         "tagline":"this is a tagline",
  //         "average_rating":4.909090909090909
  //       }
  //     }
  //   )
  //   apiCalls.selectVideo.mockResolvedValueOnce(
  //     {
  //       videos:[
  //         {"id":242,"movie_id":337401,"key":"01ON04GCwKs","site":"YouTube","type":"Teaser"},
  //         {"id":243,"movie_id":337401,"key":"KK8FHdFluOQ","site":"YouTube","type":"Trailer"},
  //         {"id":246,"movie_id":337401,"key":"1UXZEGYSwgg","site":"YouTube","type":"Featurette"},
  //         {"id":244,"movie_id":337401,"key":"R-eFm--k21c","site":"YouTube","type":"Trailer"},
  //         {"id":245,"movie_id":337401,"key":"bJbAZh3fv0g","site":"YouTube","type":"Teaser"}
  //       ]
  //     }
  //   )
  //   render(
  //     <App/>
  //   )

  //   const chosenTitle = await waitFor(() => screen.getByTestId('movie-card-337401'));
  //   fireEvent.click(chosenTitle);
  //   const chosenTagline = await waitFor(() => expect(screen.getByText('Tagline: this is a tagline')));

  //   // await waitFor(() => expect(chosenTagline).toBeInTheDocument());

  // })
});
