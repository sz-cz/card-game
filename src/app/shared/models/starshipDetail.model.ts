import { ResourceDetail, ResourceProperties } from '.';

export interface StarshipProperties extends ResourceProperties {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
}

export type StarshipDetail = ResourceDetail<StarshipProperties>;

export type StarshipPropertiesTuple = [StarshipProperties, StarshipProperties];
