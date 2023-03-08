import Axios from 'axios';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { authTokenAtom } from '../state';

export const useAxios = () => {
  const [authToken] = useAtom(authTokenAtom);

  return useMemo(() => {
    // Default config options
    const defaultOptions = {
      baseURL:
        process.env.NEXT_PUBLIC_API_URL || 'https://starcoin.hackover.dev:2096',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Create instance
    const axios = Axios.create(defaultOptions);

    // Set the AUTH token for any request
    axios.interceptors.request.use(function (config) {
      const token = authToken;
      if (config?.headers && token) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
      }
      return config;
    });

    return axios;
  }, [authToken]);
};
