import { createClient } from 'redis';

const client = createClient()
  .on('connect', res => console.log('Redis client connected to the server'))
  .on('error', err => console.log('Redis client not connected to the server:', err.toString()));
