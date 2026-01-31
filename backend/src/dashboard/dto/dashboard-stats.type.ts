import { ObjectType, Field, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class CategoryStat {
  @Field()
  category: string;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  totalQuantity: number;
}

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  totalProducts: number;

  @Field(() => Int)
  totalQuantity: number;

  @Field(() => Float)
  totalValue: number;

  @Field(() => Int)
  lowStockProducts: number;

  @Field(() => [CategoryStat])
  categoryStats: CategoryStat[];
}
