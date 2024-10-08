import { Queue, Job } from 'kue';

function createJob(queue, data) {
	const job = queue.create('push_notification_code_3', data);

	job
	.on('enqueue', () => {
		console.log('Notification job created:', job.id);
	})
	.on('complete', () => {
		console.log('Notification job', job.id, 'completed');
	})
	.on('failed', (err) => {
		console.log(
			'Notification job',
			job.id,
			'failed:',
			err.message || err.toString()
		);
	})
	.on('progress', (progress, _data) => {
		console.log(
			'Notification job',
			job.id,
			`${progress}% complete`
		);
	});

	job.save();
}

export const createPushNotificationsJobs = (jobs, queue) => {
	if (!(jobs instanceof Array)) {
		throw new Error('Jobs is not an array');
	}
	for (const data of jobs) {
		createJob(queue, data);
	}
};

export default createPushNotificationsJobs;
