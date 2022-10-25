import {Entity, model, property} from '@loopback/repository';

@model()
export class Location extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;

  @property({
    type: 'number',
    required: true,
  })
  long: number;

  @property({
    type: 'number',
    required: true,
  })
  dataTimeStamp: number;

  @property({
    type: 'number',
    required: true,
  })
  altitude: number;

  @property({
    type: 'number',
    required: true,
  })
  elevation: number;


  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
