import { FetchOptions } from '../../context/interface/FetchOptions';
import { ProfilesApiData } from '../../interface/Profile';
import API from '../../API';

const searchProfilesByCity = async (search: string): Promise<ProfilesApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${API}/profile/search/city/${search}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default searchProfilesByCity;
