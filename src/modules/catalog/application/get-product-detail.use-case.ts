import type { ProductRepository } from "../domain/repositories/product.repository";

export class GetProductDetailUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(id: number) {
    return this.repository.getById(id);
  }
}
