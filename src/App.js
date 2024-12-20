import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Certifique-se de estilizar conforme a imagem

function App() {
  const [movies, setMovies] = useState([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: 'dce1f95fa8500250aa116a0bfa99196e', // Substitua pela sua API_KEY
              language: 'pt-BR',
              page: 1,
            },
          }
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedMovies = favoritesOnly
    ? filteredMovies.filter((movie) => movie.favorite)
    : filteredMovies;

  const toggleFavorite = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  };

  if (loading) {
    return <p>Carregando filmes...</p>;
  }

  return (
    <div className="app">
      <h1>Filmes Populares</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite algum filme para pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>🔍</button>
        <label>
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={() => setFavoritesOnly(!favoritesOnly)}
          />
          Mostrar apenas meus filmes favoritos
        </label>
      </div>

      <div className="movies-list">
        {displayedMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h2>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </h2>
              <p>⭐ {movie.vote_average}</p>
              <p>{movie.overview}</p>
              <button onClick={() => toggleFavorite(movie.id)}>
                {movie.favorite ? 'Remover Favorito' : 'Favoritar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
