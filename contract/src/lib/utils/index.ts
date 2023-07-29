export const isAddress = (value: unknown) => {
	if (!(typeof value === 'string' && value !== '')) {
		throw Error(`Validation error: address has to be non-empty string`);
	}
};

export const isUInt = (value: unknown) => {
	if (
		!(
			typeof value === 'number' &&
			Number.isSafeInteger(value) &&
			!Number.isNaN(value) &&
			value >= 0
		)
	) {
		throw Error(`Validation error: value has to be integer and >= 0`);
	}
};

export function Result(data: any) {
	return { result: data };
}
