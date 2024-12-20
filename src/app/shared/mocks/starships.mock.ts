import { StarshipApiResponse, StarshipProperties } from '..';

export const mockStarship1: StarshipProperties = {
  name: 'X-Wing',
  model: 'T-65 X-wing starfighter',
  starship_class: 'Starfighter',
  manufacturer: 'Incom Corporation',
  cost_in_credits: '149999',
  length: '12.5',
  crew: '1',
  passengers: '0',
  max_atmosphering_speed: '1050',
  hyperdrive_rating: '1.0',
  MGLT: '100',
  cargo_capacity: '110',
  consumables: '1 week',
  pilots: ['Luke Skywalker', 'Wedge Antilles'],
  created: '',
  edited: '',
  url: '',
};

export const mockStarship2: StarshipProperties = {
  name: 'TIE Fighter',
  model: 'Twin Ion Engine Fighter',
  starship_class: 'Starfighter',
  manufacturer: 'Sienar Fleet Systems',
  cost_in_credits: '75000',
  length: '6.4',
  crew: '1',
  passengers: '0',
  max_atmosphering_speed: '1200',
  hyperdrive_rating: 'None',
  MGLT: '90',
  cargo_capacity: '65',
  consumables: '2 days',
  pilots: [],
  created: '',
  edited: '',
  url: '',
};

export const mockStarshipResp1: StarshipApiResponse = {
  message: 'ok',
  result: {
    properties: mockStarship1,
    description: 'A Starship',
    _id: '5f63a34fee9fd7000499be21',
    uid: '9',
    __v: 0,
  },
};
export const mockStarshipResp2: StarshipApiResponse = {
  message: 'ok',
  result: {
    properties: mockStarship2,
    description: 'A Starship',
    _id: '5f63a34fee9fd7000499be21',
    uid: '3',
    __v: 0,
  },
};
