import { createContext, Dispatch, SetStateAction } from "react";

export const LocaleContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["en", () => "en"]);
