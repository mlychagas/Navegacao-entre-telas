import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { getMovieDetails } from '../services/tmdbServiso';
import { globalStyles, spacing, colors } from '../styles/globalStyles';

export default function TelaDetalhes({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={[styles.container, globalStyles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={[styles.container, globalStyles.centerContent]}>
        <Text style={globalStyles.errorText}>
          ❌ Erro ao carregar detalhes do filme
        </Text>
      </View>
    );
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <ScrollView style={styles.container}>
      {backdropUrl && (
        <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: imageUrl }} style={styles.poster} />
          
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            {movie.tagline && (
              <Text style={styles.tagline}>"{movie.tagline}"</Text>
            )}
            
            <View style={styles.metaInfo}>
              <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
              {movie.release_date && (
                <Text style={styles.year}>
                  📅 {new Date(movie.release_date).getFullYear()}
                </Text>
              )}
              {movie.runtime && (
                <Text style={styles.runtime}>⏱️ {movie.runtime} min</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Sinopse</Text>
          <Text style={styles.overview}>
            {movie.overview || 'Sem sinopse disponível'}
          </Text>
        </View>

        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎭 Gêneros</Text>
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎬 Elenco Principal</Text>
            {movie.credits.cast.slice(0, 5).map((actor) => (
              <Text key={actor.id} style={styles.castMember}>
                • {actor.name} {actor.character && `como ${actor.character}`}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: spacing.lg,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  rating: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  year: {
    color: colors.textSecondary,
  },
  runtime: {
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  overview: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  genreTag: {
    backgroundColor: colors.cardBackground,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
  },
  genreText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
  castMember: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
});