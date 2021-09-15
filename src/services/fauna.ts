import { Client} from 'faunadb';

export const fauna = new Client({
    domain: 'db.us.fauna.com',
    scheme: 'https',
    secret: process.env.FAUNADB_KEY
});