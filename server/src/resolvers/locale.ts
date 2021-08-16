import { Arg, Query, Resolver } from "type-graphql";
import { Locale } from "../entities/Locale";

@Resolver()
export class LocaleResolver {
  @Query(() => [Locale])
  locales(): Promise<Locale[]> {
    return Locale.find();
  }

  @Query(() => Locale, { nullable: true })
  locale(@Arg("iso") iso: string): Promise<Locale | undefined> {
    return Locale.findOne(iso);
  }
}
