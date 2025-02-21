// src/components/MovieCard.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToShortlist, removeFromShortlist } from '../store/slices/shortlistSlice';
import { IMAGE_BASE_URL } from '../api/apiConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const MovieCard = ({ movie, navigation }) => {
  const dispatch = useDispatch();
  const shortlistedMovies = useSelector(state => state.shortlist.movies);
  const isShortlisted = shortlistedMovies.some(m => m.id === movie.id);

  // Format release date
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const toggleShortlist = () => {
    if (isShortlisted) {
      dispatch(removeFromShortlist(movie.id));
    } else {
      dispatch(addToShortlist(movie));
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movieId: movie.id })}
    >
      <Image
        style={styles.poster}
        source={{ 
          uri: movie.poster_path 
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/150x225?text=No+Image'
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.releaseDate}>
          {formatDate(movie.release_date)}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Text>
          <Text style={styles.voteCount}>
            ({movie.vote_count} votes)
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.shortlistButton}
        onPress={toggleShortlist}
      >
        <Icon 
          name={isShortlisted ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color={isShortlisted ? "#4CAF50" : "#666"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  poster: {
    width: 80,
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  voteCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  shortlistButton: {
    padding: 12,
    justifyContent: 'center',
  },
});

export default MovieCard;