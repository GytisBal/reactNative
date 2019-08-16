import axios from 'axios';
import Config from 'react-native-config';

export const login = user => {

  return axios.post(Config.API_HOST,
    {
      email: user.email,
      password: user.password,
    },
    {
      headers: {
        Accept: `'application/json'`,
        "Content-Type": "application/json"
      }
    }
  );
};
