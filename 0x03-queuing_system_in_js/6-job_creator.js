import { createQueue } from 'kue';

const queue = createQueue({name: 'push_notification_code'});

const job = queue.create('push_notification_code', {
	phoneNumber: '0245634617',
	message: 'Account\'s phone number',
});

job
	.on('enqueue', () => {
		console.log('Notification job created:', job.id);
	})
	.on('complete', () => {
		console.log('Notification job completed');
	})
	.on('failed', () => {
		console.log('Notification job failed');
	});

job.save();
