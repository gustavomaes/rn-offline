export const saveMovie = async (db, collection, data) => {
  await db.action(async () => {
    const newMovie = await collection.create((movie) => {
      movie.Title = data.Title;
      movie.Plot = data.Plot;
      movie.Images = data.Images;
      movie._raw.id = String(data.id);
      data.id ? (movie.movie_id = data.id) : null;
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
