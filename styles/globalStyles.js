import { StyleSheet } from 'react-native';

// Cores do tema
export const colors = {
  background: '#1a1a1a',
  cardBackground: '#2a2a2a',
  primary: '#8b22e1', 
  textPrimary: '#fff',
  textSecondary: '#ccc',
  accent: '#ffd700',
  error: '#ff6b6b',
  placeholder: '#333',
};

// Espaçamentos
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// Estilos globais
export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: spacing.xxl,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignSelf: 'flex-start',
  },
  section: {
    marginBottom: spacing.xxl,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  movieCard: {
    width: 140,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: '100%',
    height: 210,
    backgroundColor: colors.placeholder,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    padding: spacing.sm,
    minHeight: 40,
  },
  ratingContainer: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  rating: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: spacing.lg,
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    marginBottom: spacing.lg,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Estilos de ScrollView e Listas
  scrollViewContent: {
    flexGrow: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  
  // Estilos de Pesquisa
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    color: colors.textPrimary,
    padding: spacing.md,
    paddingRight: 40,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.placeholder,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.sm,
    padding: spacing.sm,
  },
  clearButtonText: {
    color: colors.textSecondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  // Estilos de Estados de Pesquisa
  searchingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  searchingText: {
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    fontSize: 14,
  },
  
  // Estilos de Resultados de Pesquisa
  searchResultsSection: {
    marginBottom: spacing.xxl,
  },
  searchResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    justifyContent: 'flex-start',
  },
  
  // Estilos de Mensagens de Feedback
  noResultsContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  noResultsText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  noUpcomingContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxl,
  },
  noUpcomingText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
});
