import React, {Component} from 'react';
// import { NavLink, Link } from 'react-router-dom';
import rancidTomato from '../assets/rancidTomatillo.png';
import '../styles/Navigation.scss';

class Navigation extends Component{
  constructor() {
    super();
    this.state = {
      sorted: false,
      search: ''
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { movies, getSortedMovies } = this.props;    
    if(!this.state.sorted) {
      movies.sort((a, b) => {
        return parseInt(a.release_date) - parseInt(b.release_date)
      })  
    } else {
      movies.sort((b, a) => {
        return parseInt(a.release_date) - parseInt(b.release_date)
      })  
    }
    this.setState((prevState) => {
      return {sorted: !prevState.sorted}
    })
    getSortedMovies(movies)
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.toLowerCase()
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { search } = this.state;
    const updateMovies = this.props.movies.filter(movie => movie.title.toLowerCase().includes(search))
    this.setState({
      search: ''
    })
    this.props.getSortedMovies(updateMovies)
  }

  render() {
    const { getSortedMovies } = this.props;
    return (
      <nav className='nav-bar'>
        <section className="nav-top">
          <img className='logo' src={rancidTomato} alt='logo' height='35px' width='35px' onClick={() => getSortedMovies([])}/> 
          <form onSubmit={this.handleSubmit} className='filter-inputs'>
            <label>
              <input className="search-input" placeholder="MOVIE NAME" name="search" value={this.state.search} onChange={this.handleOnChange}/>
            </label>
            <input className="search-button" type="submit" value='search'/>
          </form>          
        </section>
        <section className="nav-bottom">
          <button className='sort-button' onClick={this.handleClick}>{this.state.sorted ? "All Movies" : "Recent Releases"}</button> 
        </section>
      </nav>

    )
  }
} 

export default Navigation;