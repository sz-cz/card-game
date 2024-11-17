import { Resource } from './resource.model';
import { PersonDetail } from './personDetail.model';
import { StarshipDetail } from './starshipDetail.model';

export interface ApiResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Resource[];
}

interface ResourceApiResponse<T> {
  message: string;
  result: T;
}

export type PersonApiResponse = ResourceApiResponse<PersonDetail>;
export type StarshipApiResponse = ResourceApiResponse<StarshipDetail>;
