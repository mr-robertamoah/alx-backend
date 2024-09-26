import { createClient, print } from 'redis';

const client = createClient()
  .on('error', err => console.log('Redis client not connected to the server:', err.toString()));

client.on('connect', async (res) => {
	console.log('Redis client connected to the server')
})

client.subscribe('holberton school channel')

client.on('message', (err, msg) => {
	console.log(msg)
	if (msg == 'KILL_SERVER') {
		client.unsubscribe();
		client.quit();
	}
})
