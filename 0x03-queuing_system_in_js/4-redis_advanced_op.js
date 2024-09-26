import { createClient, print } from 'redis';

const client = createClient()
  .on('error', err => console.log('Redis client not connected to the server:', err.toString()));

function main() {
	const obj = {
		Portland: '50',
		Seattle: '80',
		'New York': '20',
		Bogota: '20',
		Cali: '40',
		Paris: '2'
	}
	const hash = 'HolbertonSchools'

	for (const key of Object.entries(obj)) {
		client.hset(hash, key, obj[key], print)
	}

	client.hgetall(hash, (err, value) => console.log(value))
}

client.on('connect', async (res) => {
	console.log('Redis client connected to the server')
	main()
})
