import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Locale extends BaseEntity {
  @Field()
  @PrimaryColumn()
  iso!: string;
}
