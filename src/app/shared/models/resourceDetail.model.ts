export interface ResourceProperties {
  created: string;
  edited: string;
  name: string;
  url: string;
}

export interface ResourceDetail<T> {
  properties: T;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}
