import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GoogleApi implements ICredentialType {
	name = 'googleApi';
	displayName = 'Google API';
	properties: INodeProperties[] = [
		{
			displayName: 'OAuth2 Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'OAuth2 Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'OAuth2 Refresh Token',
			name: 'refreshToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
