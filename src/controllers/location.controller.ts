import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Location} from '../models';
import {TodoRepository} from '../repositories';

export class LocationController {
  constructor(
    @repository(TodoRepository)
    public todoRepository : TodoRepository,
  ) {}

  @post('/locations')
  @response(200, {
    description: 'Location model instance',
    content: {'application/json': {schema: getModelSchemaRef(Location)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocation',
            exclude: ['id'],
          }),
        },
      },
    })
    location: Omit<Location, 'id'>,
  ): Promise<Location> {
    return this.todoRepository.create(location);
  }

  @get('/locations/count')
  @response(200, {
    description: 'Location model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Location) where?: Where<Location>,
  ): Promise<Count> {
    return this.todoRepository.count(where);
  }

  @get('/locations')
  @response(200, {
    description: 'Array of Location model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Location, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Location) filter?: Filter<Location>,
  ): Promise<Location[]> {
    return this.todoRepository.find(filter);
  }

  @patch('/locations')
  @response(200, {
    description: 'Location PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Location,
    @param.where(Location) where?: Where<Location>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(location, where);
  }

  @get('/locations/{id}')
  @response(200, {
    description: 'Location model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Location, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Location, {exclude: 'where'}) filter?: FilterExcludingWhere<Location>
  ): Promise<Location> {
    return this.todoRepository.findById(id, filter);
  }

  @patch('/locations/{id}')
  @response(204, {
    description: 'Location PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Location,
  ): Promise<void> {
    await this.todoRepository.updateById(id, location);
  }

  @put('/locations/{id}')
  @response(204, {
    description: 'Location PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() location: Location,
  ): Promise<void> {
    await this.todoRepository.replaceById(id, location);
  }

  @del('/locations/{id}')
  @response(204, {
    description: 'Location DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}
