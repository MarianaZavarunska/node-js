import express from 'express';
import { arr } from './users';

const app = express();
console.log(arr);

app.listen(5300, () => {
    console.log('Server has started 🚀');
});
