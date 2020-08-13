import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, Button, StatusBar, Text} from 'react-native';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import faker from 'faker';
import Movie from './Movie';
import MovieModel from '../model/MovieModel';
import {useObservable} from 'rxjs-hooks';

const Movies = () => {
  const database = useDatabase();
  const moviesCollection = MovieModel.useCollection();
  const movies = useObservable(() =>
    moviesCollection.query().observeWithColumns(['Title']),
  );

  const saveMovie = async (data) => {
    console.log('saveMovie> ', data);
    await database.action(async () => {
      const newMovie = await moviesCollection.create((movie) => {
        movie.Title = data.Title;
        movie.Plot = data.Plot;
        movie.Images = data.Images;
        movie._raw.id = String(data.id);
        movie.movie_id = data.id;
      });
      console.log('newPost> ', newMovie);
    });
  };

  useEffect(() => {
    // async function
    fetch('http://localhost:3000/movies')
      .then((response) => response.json())
      .then((json) => {
        json.map(async (item) => {
          // console.log(item);
          await saveMovie(item);
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

    await database.action(async () => {
      await moviesCollection.create((movie) => {
        movie.Title = data.Title;
        movie.Plot = data.Plot;
        movie.Images = data.Images;
        movie.movie_id = data.id;
      });
    });
  };

  const updateTitle = async (movie) => {
    const newTitle = movie.Title + ' ' + faker.random.number(1);
    await database.action(async () => {
      await movie.update((updateItem) => {
        updateItem.Title = newTitle;
      });
    });

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
      .then((json) => {
        console.log('newTitle> ', json);
      });
  };

  const deleteItem = async (movie) => {
    await database.action(async () => {
      await movie.destroyPermanently(); // permanent
    });
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
                deleteItem={(movie) => deleteItem(movie)}
              />
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Movies;
