import { ResourceDetail, ResourceProperties } from '.';

export interface PersonProperties extends ResourceProperties {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
}

export type PersonDetail = ResourceDetail<PersonProperties>;

export type PersonPropertiesTuple = [PersonProperties, PersonProperties];
