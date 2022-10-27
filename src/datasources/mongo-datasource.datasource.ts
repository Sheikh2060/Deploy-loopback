import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDatasource',
  connector: 'mongodb',
  url: 'mongodb+srv://Sheikh_Ali:Sheikh20@location.viynwgp.mongodb.net/muscleforce?retryWrites=true&w=majority',
  host: 'localhost',
  port: 3000,
  user: 'Sheikh_Ali',
  password: 'Sheikh20',
  database: 'muscleforce',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDatasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDatasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
