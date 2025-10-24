const API_KEY = 0; // Substitua 0 pela sua chave de API válida entre 'aspas'
const BASE_URL = 'https://api.themoviedb.org/3';
// Função para buscar filmes por título
export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar filmes');
  return response.json();
};

// Função para buscar detalhes de um filme por ID
export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar detalhes');
  return response.json();
};
// Função para buscar filmes populares
export const getPopularMovies = async () => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar filmes populares');
  return response.json();
};
// Função para buscar filmes em cartaz
export const getNowPlayingMovies = async () => {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar lançamentos');
  return response.json();
};
// Função para buscar próximos lançamentos
export const getUpcomingMovies = async () => {
  try {
    // Adiciona region=BR para obter datas brasileiras
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=pt-BR&region=BR&page=1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar próximos lançamentos');
    
    const data = await response.json();
    
    // Remove filmes com data de lançamento no passado
    // Pega a data atual (sem hora) para comparação precisa
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data
    
    // Filtra apenas filmes cuja data de lançamento seja HOJE ou NO FUTURO
    const filmesFuturos = data.results.filter(movie => {
      if (!movie.release_date) return false; // Remove filmes sem data
      
      const dataLancamento = new Date(movie.release_date);
      dataLancamento.setHours(0, 0, 0, 0); // Zera as horas
      
      // Retorna true apenas se a data for hoje ou futura
      return dataLancamento >= hoje;
    });
    
    // Ordena por data de lançamento (mais próximos primeiro)
    filmesFuturos.sort((a, b) => {
      return new Date(a.release_date) - new Date(b.release_date);
    });
    
    return { ...data, results: filmesFuturos };
  } catch (error) {
    console.error('Erro ao buscar próximos lançamentos:', error);
    throw error;
  }
};
// Função para buscar filmes mais bem avaliados
export const getTopRatedMovies = async () => {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar melhores avaliados');
  return response.json();
};