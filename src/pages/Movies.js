import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, Button, StatusBar, Text} from 'react-native';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import faker from 'faker';
import Movie from './Movie';
import MovieModel from '../model/MovieModel';
import {useObservable} from 'rxjs-hooks';
import {
  saveMovie,
  saveMovieWhitId,
  updateMovie,
  deleteMovie,
} from '../model/MovieController';

const Movies = () => {
  const database = useDatabase();
  const moviesCollection = MovieModel.useCollection();
  const movies = useObservable(() =>
    moviesCollection.query().observeWithColumns(['Title']),
  );

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then((response) => response.json())
      .then((json) => {
        json.map(async (item) => {
          await saveMovieWhitId(database, moviesCollection, item);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMovie = async () => {
    const data = {
      Title: faker.random.word(),
      Plot: faker.random.words(),
      Images: 'https://picsum.photos/300/200',
    };

    const newMovie = await saveMovie(database, moviesCollection, data);
    console.log('newMovie> ', newMovie.id);
    fetch('http://localhost:3000/movies/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        id: newMovie.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log('newMovie> ', json));
  };

  const updateTitle = async (movie) => {
    const newTitle = movie.Title + ' ' + faker.random.number(1);
    const data = {
      Title: newTitle,
      Plot: movie.Plot,
      Images: movie.Images,
    };
    await updateMovie(database, movie, data);

    fetch(`http://localhost:3000/movies/${movie.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Title: newTitle,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log('newTitle> ', json));
  };

  const deleteItem = async (movie) => {
    await deleteMovie(database, movie);
    fetch(`http://localhost:3000/movies/${movie.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log('deleteItem> ', json));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button title="ADD MOVIE" onPress={addMovie} />
        <FlatList
          data={movies ? movies.reverse() : []}
          renderItem={(item) => {
            console.log('item> ', item.item.id);
            return (
              <Movie
                movie={item.item}
                updateTitle={(movie) => updateTitle(movie)}
                deleteItem={async (movie) => deleteItem(movie)}
              />
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Movies;
