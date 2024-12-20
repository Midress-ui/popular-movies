const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 4000;
const TMDB_API = process.env.TMDB_API_KEY;

// Rota para buscar filmes populares
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// Rota para buscar detalhes de um filme
app.get("/api/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar detalhes do filme" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
