import { injectable } from 'inversify';
import config from '../../../config';
import { connect } from 'mongoose';

export interface IDBDatasource {
  connectDb(): Promise<boolean>;
}

@injectable()
export class DBDatasourceImpl implements IDBDatasource {
  connectDb(): Promise<boolean> {
    const isConnected = new Promise<boolean>(async (resolve, reject) => {
      try {
        const url: string = config.MONGODB_URL || '';
        const connected = await connect(url);
        if (connected) {
          console.log('Database connected successfully.');
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        console.error('DB connection error:', err);
        reject(false);
      }
    });

    return isConnected;
  }
}
