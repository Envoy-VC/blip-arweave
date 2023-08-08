import { gql } from '@apollo/client';

export const getTags = (id: string) => {
	return gql`query getTags {
		transactions(ids: ["${id}"]) {
			edges {
				node {
					tags {
						name
						value
					}
				}
			}
		}
	}`;
};
