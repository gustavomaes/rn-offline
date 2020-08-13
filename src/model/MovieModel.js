import {field} from '@nozbe/watermelondb/decorators';
import {Model, Query} from '@nozbe/watermelondb';
import {useDatabase} from '@nozbe/watermelondb/hooks';

export default class MovieModel extends Model {
  static table = 'movies';

  static useCollection = () => useDatabase().collections.get(MovieModel.table);

  @field('Title') Title;
  @field('Plot') Plot;
  @field('Images') Images;
}
