const GOOGLE_API_URI = 'https://www.googleapis.com/oauth2/v3/userinfo';

type GoogleProfile = {
  sub: string,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  email: string,
  email_verified: boolean,
  locale: string,
}

export async function getUserInfo(accessToken: string): Promise<GoogleProfile> {
  const response = await fetch(GOOGLE_API_URI, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json() as Promise<GoogleProfile>;
}
