import React from 'react';
import Account from 'arweave-account';

const useArweaveAccount = (address: string) => {
	const account = new Account();
	const [data, setData] = React.useState<any>(null);
	const [error, setError] = React.useState<any>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		async function getProfile() {
			let res = await account.get(address);
			console.log(res);
			setData(res);
		}
		try {
			setIsLoading(true);
			if (address) {
				getProfile();
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setError(error);
		}
	}, [address]);

	return { data, error, isLoading };
};

export default useArweaveAccount;
