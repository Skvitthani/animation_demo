import {faker} from '@faker-js/faker';

export const getFackerData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      faker.seed(100);
      const DATA = [...Array(30).keys()].map((_, i) => {
        return {
          userId: faker.string.uuid(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          displayName: faker.internet.displayName(),
          username: faker.internet.userName(),
        };
      });
      resolve(DATA);
    } catch (error) {
      console.log('error ::', error);
    }
  });
};
