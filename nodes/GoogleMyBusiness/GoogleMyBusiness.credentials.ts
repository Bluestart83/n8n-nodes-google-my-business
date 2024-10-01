import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class GoogleApi implements ICredentialType {
	name = 'googleApi';
	displayName = 'Google API';
	properties = [
		{
			displayName: 'OAuth2 Client ID',
			name: 'clientId',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'OAuth2 Client Secret',
			name: 'clientSecret',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'OAuth2 Refresh Token',
			name: 'refreshToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
