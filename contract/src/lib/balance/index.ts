import { RhapsodyState } from '../../../types';
import { isAddress, isUInt, Result } from '../utils';

export type BalanceOfResult = {
	result: {
		id: string;
		account: string;
		balance: number;
	};
};

export type BalanceOfProps = {
	tokenId: string;
	account: string;
};

/**
 * @param  RhapsodyState The Contract Mutable State
 * @param  tokenId Token Id of the token
 * @param  account Account to check balance of
 */
export const balanceOf = (
	state: RhapsodyState,
	{ tokenId, account }: BalanceOfProps
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
	data: BalanceOfProps[]
) => {
	if (data.length <= 0) {
		throw Error(`Validation error: data has to be non-empty array`);
	}
	data.forEach((d) => {
		isAddress(d.account);
		if (!state.tokens.find((token) => token.tokenId === d.tokenId)) {
			throw Error(`Token with id ${d.tokenId} not found`);
		}
	});
	let result: BalanceOfResult[] = [];
	data.forEach((d) => {
		result.push(balanceOf(state, d));
	});
	return Result(result);
};
