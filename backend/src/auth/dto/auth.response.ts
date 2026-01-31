import { ObjectType, Field } from "@nestjs/graphql";
import { UserType } from "./user.type";

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}
