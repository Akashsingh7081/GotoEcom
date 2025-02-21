import React from "react";
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/movieSlice";
import { fetchMovies } from "../api/moviesApi";

const MovieListScreen = () => {
  const { data, error, isLoading } = useQuery("movies", fetchMovies);
  const dispatch = useDispatch();

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error loading movies</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch(addMovie(item))}
              >
                <Text style={styles.buttonText}>Shortlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#ff3d00",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});

export default MovieListScreen;
