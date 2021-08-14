import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Locale {
  @PrimaryColumn()
  iso!: string;
}
