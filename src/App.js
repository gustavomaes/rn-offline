import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, Button, StatusBar} from 'react-native';
import faker from 'faker';
import Movie from './Movie';

const App = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then((response) => response.json())
      .then((json) => {
        setMovies(json);
        console.log(json);
      });
  }, []);

  const addMovie = () => {
    fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Title: faker.random.word(),
        Plot: faker.random.words(),
        Images: 'https://picsum.photos/300/200',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("json> ", json);
        const addMovies = movies;
        addMovies.unshift(json);

        setMovies(addMovies);
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button title="ADD MOVIE" onPress={addMovie} />
        <FlatList
          data={movies.reverse()}
          renderItem={(m) => <Movie movie={m.item} />}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
