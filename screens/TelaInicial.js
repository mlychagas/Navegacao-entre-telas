import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput } from 'react-native';
import { getPopularMovies, getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies, searchMovies } from '../services/tmdbServiso';
import { globalStyles, colors } from '../styles/globalStyles';

export default function TelaInicial({ navigation }) {
  // Estados para cada categoria de filme.
  const [populares, setPopulares] = useState([]);
  const [cartaz, setCartaz] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [avaliados, setAvaliados] = useState([]);

  // Estados de controle de carregamento e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Estados para pesquisa
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Disponibiliza a função no escopo do componente para ser usada no botão "Tentar Novamente"
  const fetchFilmes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Faz as requisições juntas
      const [popularData, cartazData, lancamentosData, avaliadosData] = await Promise.all([
        getPopularMovies(),
        getNowPlayingMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
      ]);
      // Atualiza os estados com os resultados
      setPopulares(popularData.results || []);
      setCartaz(cartazData.results || []);
      setLancamentos(lancamentosData.results || []);
      setAvaliados(avaliadosData.results || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilmes();
  }, [fetchFilmes]);

  //  Efeito para pesquisa com debounce
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length >= 3) {
        setSearching(true);
        try {
          const results = await searchMovies(searchQuery);
          setSearchResults(results.results || []);
        } catch (error) {
          console.error('Erro na pesquisa:', error);
          setSearchResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Função para limpar pesquisa
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  // Componente para exibir cada filme no carrossel
  const FilmeCard = ({ movie, onPress }) => {
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
    
    return (
      <TouchableOpacity onPress={onPress} style={globalStyles.movieCard}>
        <Image 
          source={{ uri: imageUrl }} 
          style={globalStyles.poster}
          resizeMode="cover"
        />
        <Text style={globalStyles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={globalStyles.ratingContainer}>
          <Text style={globalStyles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  // Componente para exibir carrossel de filmes
  const FilmeCarrossel = ({ title, movies, navigation }) => {
    const handleMoviePress = (movieId) => {
      navigation.navigate('Detalhes', { movieId });
    };
    
    return (
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>{title}</Text>
        <FlatList
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmeCard
              movie={item}
              onPress={() => handleMoviePress(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          contentContainerStyle={globalStyles.listContent}
        />
      </View>
    );
  };
  // Exibe indicador de carregamento
  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }
  // Exibe mensagem de erro
  if (error) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent]}>
        <Text style={globalStyles.errorText}>❌ {error}</Text>
        <Button title="Tentar Novamente" onPress={fetchFilmes} />
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={globalStyles.scrollViewContent}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={globalStyles.container}>
        <Text style={globalStyles.headerTitle}>🎬 Descubra Filmes</Text>
        
        <View style={globalStyles.searchContainer}>
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar filmes..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={globalStyles.clearButton}
              onPress={handleClearSearch}
            >
              <Text style={globalStyles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {searching && (
          <View style={globalStyles.searchingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={globalStyles.searchingText}>Buscando...</Text>
          </View>
        )}

        {searchQuery.length >= 3 && !searching && searchResults.length > 0 && (
          <View style={globalStyles.searchResultsSection}>
            <Text style={globalStyles.sectionTitle}>
              📝 Resultados ({searchResults.length})
            </Text>
            <View style={globalStyles.searchResultsGrid}>
              {searchResults.slice(0, 12).map((movie) => (
                <FilmeCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => navigation.navigate('Detalhes', { movieId: movie.id })}
                />
              ))}
            </View>
          </View>
        )}

        {searchQuery.length >= 3 && !searching && searchResults.length === 0 && (
          <View style={globalStyles.noResultsContainer}>
            <Text style={globalStyles.noResultsText}>
              😔 Nenhum filme encontrado para "{searchQuery}"
            </Text>
          </View>
        )}

        {searchQuery.length < 3 && (
          <>
            <FilmeCarrossel 
              title="🔥 Populares" 
              movies={populares} 
              navigation={navigation}
            />
            
            <FilmeCarrossel 
              title="🎞️ Em Cartaz" 
              movies={cartaz} 
              navigation={navigation}
            />
            
            {lancamentos.length > 0 ? (
              <FilmeCarrossel 
                title="🚀 Próximos Lançamentos" 
                movies={lancamentos} 
                navigation={navigation}
              />
            ) : (
              <View style={globalStyles.noUpcomingContainer}>
                <Text style={globalStyles.sectionTitle}>🚀 Próximos Lançamentos</Text>
                <Text style={globalStyles.noUpcomingText}>
                  📅 Nenhum lançamento futuro disponível no momento
                </Text>
              </View>
            )}
            
            <FilmeCarrossel 
              title="⭐ Melhores Avaliados" 
              movies={avaliados} 
              navigation={navigation}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}