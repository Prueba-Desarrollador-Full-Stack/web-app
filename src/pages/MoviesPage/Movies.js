import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../App';
import './Movies.css';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

async function getMovies(token) {
  const moviesURL = 'http://localhost:3000/index.php/movies?token='+token;

  return axios.get(moviesURL)
    .then(response => response.data);
}

function Movies() {
  const [movies, setMovies] = useState([]);

  const {token} = useContext(AppContext);

  useEffect(() => {
    getMovies(token).then((data) => {
      setMovies(data);
      console.log(data);
    });
  }, []);

  if(movies.length === 0)
    return (
      <p>
        Cargando....
      </p>
    );
  else 
    return (
      <div className='centeredDivMovie'>
        {movies.map((movie, key) => { return (
          <div>
            <p>
              # {key+1} <br/> {movie.name} 
            </p>
            <p>
              {movie.year_released}
            </p>
            <p>
              {movie.description}
            </p>
          </div>
        );})}
      </div>
    );
}

export default Movies;