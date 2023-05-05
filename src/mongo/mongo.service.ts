import { Injectable } from '@nestjs/common';
import { connect } from 'mongoose';

@Injectable()
export class MongoService {
     constructor() {
        connect('mongodb://localhost:27017/nganya', ).then(() => {
            console.log('Connected to MongoDB');
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }
     
}
