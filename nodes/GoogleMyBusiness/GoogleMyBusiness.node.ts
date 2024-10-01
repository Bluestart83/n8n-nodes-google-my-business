//import { IHttpRequestOptions } from 'n8n-core'
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions
} from 'n8n-workflow';


export class GoogleMyBusiness implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Google My Business',
        name: 'googleMyBusiness',
        icon: 'file:google-my-business.svg',  // Reference the icon
        group: ['input'],
        version: 1,
        description: 'Manage your Google My Business reviews',
        defaults: {
            name: 'Google My Business',
        },
        inputs: ['main'],
        outputs: ['main'],
		properties: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				required: true,
				description: 'The Google My Business Account ID',
			},
			{
				displayName: 'Location ID',
				name: 'locationId',
				type: 'string',
				default: '',
				required: true,
				description: 'The location ID to fetch reviews from',
			},
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				options: [
					{
						name: 'Fetch Reviews',
						value: 'fetchReviews',
					},
					{
						name: 'Reply to Review',
						value: 'replyToReview',
					},
				],
				default: 'fetchReviews',
				required: true,
			},
			{
				displayName: 'Review ID',
				name: 'reviewId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['replyToReview'],
					},
				},
				required: true,
				description: 'The ID of the review to reply to',
			},
			{
				displayName: 'Reply Text',
				name: 'replyText',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['replyToReview'],
					},
				},
				required: true,
				description: 'The reply text for the review',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const action = this.getNodeParameter('action', 0) as string;
		const accountId = this.getNodeParameter('accountId', 0) as string;
		const locationId = this.getNodeParameter('locationId', 0) as string;

		const credentials = await this.getCredentials('googleApi');

		let responseData;

		if (action === 'fetchReviews') {
			// Make the request to fetch reviews from Google My Business
			const endpoint = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
			const options : IHttpRequestOptions = {
				method: 'GET',
				url: endpoint,
				headers: {
					Authorization: `Bearer ${credentials.access_token}`,
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		} else if (action === 'replyToReview') {
			const reviewId = this.getNodeParameter('reviewId', 0) as string;
			const replyText = this.getNodeParameter('replyText', 0) as string;

			const endpoint = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}:reply`;
			const options : IHttpRequestOptions = {
				method: 'POST',
				url: endpoint,
				headers: {
					Authorization: `Bearer ${credentials.access_token}`,
				},
				body: {
					reply: {
						comment: replyText,
					},
				},
				json: true,
			};
			responseData = await this.helpers.request(options);
		}

		return [this.helpers.returnJsonArray(responseData)];
	}
}
