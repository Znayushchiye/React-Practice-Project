import {useEffect, useState} from 'react'

import './App.css'
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// OMDb API key - 29a8a71d

const API_URL = "http://www.omdbapi.com?apikey=29a8a71d";

const App = () => {
   const [movies, setMovies] = useState([]);
   const [searchMovie, setSearchMovie] = useState("");

   const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
   };

   useEffect( () => {
      searchMovies('Spiderman');
   }, []);

   return (
      <div className='app'>
         <h1>MovieLand</h1>

         <div className='search'>
            <input 
               placeholder="Search for movies"
               value={searchMovie}
               onChange={(e) => setSearchMovie(e.target.value)}
            />
            <img
               src={SearchIcon}
               alt='Search'
               onClick={() => searchMovies(searchMovie)}
            />
         </div>

         {
            movies?.length > 0 ? (
               <div className='container'>
                  {movies.map((movie) => (<MovieCard movie={movie}/>))}
               </div>
            ) : (
               <div>
                  <h2> No movies to display</h2>
               </div>
            )
         }
      </div>
   );
}

export default App;