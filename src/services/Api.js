import {createClient} from 'pexels';

export const getData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = createClient(
        'Y3GnNUUdzX3BvXzG4BDiEJBiE4Qnqi4eFjCrgC1l2Nk5B77hwCd9ftw2',
      );

      const query = 'Nature';
      const response = await client.photos.search({query, per_page: 20});
      resolve(response?.photos);
    } catch (error) {
      console.log('error ::', error);
    }
  });
};
