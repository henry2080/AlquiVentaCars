import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Producto,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosProductoController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
  ): Promise<Producto> {
    return this.pedidosRepository.producto(id);
  }
}
