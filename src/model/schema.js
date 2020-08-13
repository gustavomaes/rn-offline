import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'movies',
      columns: [
        {name: 'Title', type: 'string'},
        {name: 'Plot', type: 'string'},
        {name: 'Images', type: 'string'},
      ],
    }),
  ],
});
