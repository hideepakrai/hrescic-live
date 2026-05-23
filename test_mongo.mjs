import fs from 'fs';
import { MongoClient } from 'mongodb';

const env = fs.readFileSync('.env', 'utf-8');
const MONGODB_URI = env.match(/MONGODB_URI="(.*?)"/)?.[1];
const TENANT_DB_NAME = env.match(/TENANT_DB_NAME="(.*?)"/)?.[1];

if (!MONGODB_URI) throw new Error('No URI');

MongoClient.connect(MONGODB_URI).then(client => {
  console.log('Connected to MongoDB!');
  const db = client.db(TENANT_DB_NAME);
  return db.collection('leads').insertOne({ formType: 'demo', email: 'test@test.com', message: 'hello', createdAt: new Date() }).then(res => {
    console.log('Inserted:', res.insertedId);
    return client.close();
  });
}).catch(console.error);
