import React from 'react';
import {Database} from '@nozbe/watermelondb';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './model/schema';
import Movies from './pages/Movies';
import MovieModel from './model/MovieModel';

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [MovieModel],
  actionsEnabled: true,
});

const App = () => {
  return (
    <>
      <DatabaseProvider database={database}>
        <Movies />
      </DatabaseProvider>
    </>
  );
};

export default App;
