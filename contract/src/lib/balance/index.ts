import { RhapsodyState } from '../../../types';
import { isAddress, isUInt, Result } from '../utils';

export type BalanceOfResult = {
	result: {
		id: string;
		account: string;
		balance: number;
	};
};

/**
 * @param  RhapsodyState The Contract Mutable State
 * @param  tokenId Token Id of the token
 * @param  account Account to check balance of
 */
export const balanceOf = (
	state: RhapsodyState,
	{
		tokenId,
		account,
	}: {
		tokenId: string;
		account: string;
	}
) => {
	isAddress(account);
	isUInt(tokenId);
	let token = state?.tokens?.find((t) => t.tokenId === tokenId);
	if (!token) {
		throw Error(`Token with id ${tokenId} not found`);
	}
	let balance = token.balances[account] || 0;
	return Result({
		id: tokenId,
		account,
		balance,
	});
};

/**
 * @param  RhapsodyState The Contract Mutable State
 * @param  tokenIds Token Ids of the tokens
 * @param  accounts Accounts to check balances of
 * @returns Array of BalanceOfResult
 */
export const balanceOfBatch = (
	state: RhapsodyState,
	{ tokenIds, accounts }: { tokenIds: string[]; accounts: string[] }
) => {
	if (tokenIds.length !== accounts.length) {
		throw Error('tokenIds and accounts arrays must have the same length');
	}
	if (tokenIds.length === 0 || accounts.length === 0) {
		throw Error('tokenIds and accounts arrays must be non-empty');
	}
	tokenIds.forEach((id) => {
		if (!state.tokens.find((t) => t.tokenId === id)) {
			throw Error(`Token with id ${id} not found`);
		}
	});
	accounts.forEach((account) => {
		isAddress(account);
	});
	let result: BalanceOfResult[] = [];
	for (let i = 0; i < tokenIds.length; i++) {
		let token = state.tokens.find((t) => t.tokenId === tokenIds[i]);
		let balance = token.balances[accounts[i]] || 0;
		result.push({
			result: {
				id: tokenIds[i],
				account: accounts[i],
				balance,
			},
		});
	}
	return Result(result);
};
