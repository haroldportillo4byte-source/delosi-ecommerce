import { GetProductDetailUseCase } from "../../application/get-product-detail.use-case";
import { GetProductsUseCase } from "../../application/get-products.use-case";
import { ApiProductRepository } from "../repositories/api-product.repository";

const productRepository = new ApiProductRepository();

export const getProductsUseCase = new GetProductsUseCase(productRepository);
export const getProductDetailUseCase = new GetProductDetailUseCase(productRepository);

export { productRepository };
