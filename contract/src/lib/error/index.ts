import { ContractError } from 'warp-contracts';

export const ContractErrors = {
	RuntimeError: (message: string) => new ContractError(`[RE:RE] ${message}`),
};
