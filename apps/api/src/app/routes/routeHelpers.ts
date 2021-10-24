import { Like } from 'typeorm';

export const whereBuilder = (whereFilter) => {
  const where = {};
  for (const key in whereFilter) {
    if (Object.prototype.hasOwnProperty.call(whereFilter, key)) {
      const value = whereFilter[key];
      // https://typeorm.io/#/find-options
      where[key] = Like(value);
    }
  }
  return where;
};
