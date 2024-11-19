import { PersonApiResponse, PersonProperties } from '..';

export const mockPerson1: PersonProperties = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  created: '',
  edited: '',
  homeworld: '',
  url: '',
};

export const mockPerson2: PersonProperties = {
  name: 'Darth Vader',
  birth_year: '41.9BBY',
  gender: 'male',
  height: '202',
  mass: '136',
  hair_color: 'none',
  skin_color: 'white',
  eye_color: 'yellow',
  created: '',
  edited: '',
  homeworld: '',
  url: '',
};

export const mockPersonResp1: PersonApiResponse = {
  message: 'ok',
  result: {
    properties: mockPerson1,
    description: 'A person',
    _id: '5f63a34fee9fd7000499be21',
    uid: '9',
    __v: 0,
  },
};
export const mockPersonResp2: PersonApiResponse = {
  message: 'ok',
  result: {
    properties: mockPerson2,
    description: 'A person',
    _id: '5f63a34fee9fd7000499be21',
    uid: '3',
    __v: 0,
  },
};
