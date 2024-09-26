import { createClient, print } from 'redis';

const client = createClient()
  .on('connect', res => console.log('Redis client connected to the server'))
  .on('error', err => console.log('Redis client not connected to the server:', err.toString()));

function setNewSchool(schoolName, value) {
	client.set(schoolName, value, print)
}

function displaySchoolValue(schoolName) {
	client.get(schoolName, (err, value) => console.log(value))
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
