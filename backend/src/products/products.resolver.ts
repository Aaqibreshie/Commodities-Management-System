import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductType } from "./dto/product.type";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { GqlAuthGuard } from "../common/guards/gql-auth.guard";

@Resolver(() => ProductType)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductType])
  @UseGuards(GqlAuthGuard)
  async products(): Promise<ProductType[]> {
    return this.productsService.findAll();
  }

  @Query(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async product(@Args("id") id: string): Promise<ProductType> {
    return this.productsService.findOne(id);
  }

  @Query(() => [String])
  @UseGuards(GqlAuthGuard)
  async categories(): Promise<string[]> {
    return this.productsService.getCategories();
  }

  @Mutation(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async createProduct(
    @Args("createProductInput") createProductInput: CreateProductInput,
  ): Promise<ProductType> {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args("id") id: string,
    @Args("updateProductInput") updateProductInput: UpdateProductInput,
  ): Promise<ProductType> {
    return this.productsService.update(id, updateProductInput);
  }

  @Mutation(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async deleteProduct(@Args("id") id: string): Promise<ProductType> {
    return this.productsService.remove(id);
  }
}
