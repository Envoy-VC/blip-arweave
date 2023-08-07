export const getFileSize = (size: number) => {
	const i = Math.floor(Math.log(size) / Math.log(1024));
	return `${(size / Math.pow(1024, i)).toFixed(2)} ${
		['B', 'kB', 'MB', 'GB', 'TB'][i]
	}`;
};


export const formatTimestamp = (timestamp: number) => {
	const now = Math.floor(Date.now() / 1000);
	const diff = now - timestamp;
	const seconds = diff;
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);

	if (years > 0) {
		return `${years} year${years > 1 ? 's' : ''} ago`;
	}
	if (months > 0) {
		return `${months} month${months > 1 ? 's' : ''} ago`;
	}
	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''} ago`;
	}
	if (hours > 0) {
		return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	}
	if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	}
	if (seconds > 0) {
		return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
	}
};