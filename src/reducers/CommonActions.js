import {INSTITUTION_CHANGED} from '../reducers/types';

export const setChnageInstitution = (institution) => {
  console.log('--------inst--------' + JSON.stringify(institution));

  return {
    type: INSTITUTION_CHANGED,
    payload: institution,
  };
};
