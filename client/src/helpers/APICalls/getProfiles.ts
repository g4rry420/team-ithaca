import { FetchOptions } from '../../context/interface/FetchOptions';
import { ProfilesApiData, IProfile } from '../../interface/Profile';
import API from '../../API';

const getProfiles = async (): Promise<ProfilesApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${API}/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
};

export const getOneFullUserProfile = async (
  userId: string,
): Promise<{
  user?: {
    firstName: string;
    lastName: string;
    isDogSitter: boolean;
    email: string;
    _id: string;
    profileId: IProfile[];
  };
  success?: string;
  error?: string;
}> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${API}/profile/${userId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfiles;
