import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;
}
