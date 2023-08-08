import { gql } from '@apollo/client';

export const getTransactions = gql`
	query getTransactions($ids: String[]!) {
		transactions(ids: $ids) {
			edges {
				node {
					id
					address
					timestamp
					tags {
						name
						value
					}
				}
			}
		}
	}
`;
