export const saveMovie = async (db, collection, data) => {
  return await db.action(async () => {
    const newMovie = await collection.create((movie) => {
      movie.Title = data.Title;
      movie.Plot = data.Plot;
      movie.Images = data.Images;
    });
    console.log('saveMovie> ', newMovie);
    return newMovie;
  });
};

export const saveMovieWhitId = async (db, collection, data) => {
  await db.action(async () => {
    const newMovie = await collection.create((movie) => {
      movie.Title = data.Title;
      movie.Plot = data.Plot;
      movie.Images = data.Images;
      movie._raw.id = String(data.id);
    });
    return newMovie;
  });
};

export const updateMovie = async (db, movie, data) => {
  await db.action(async () => {
    await movie.update((updateItem) => {
      updateItem.Title = data.Title;
      updateItem.Plot = data.Plot;
      updateItem.Images = data.Images;
    });
  });
};

export const deleteMovie = async (db, movie) => {
  await db.action(async () => {
    await movie.destroyPermanently();
  });
};
