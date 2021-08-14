import "dotenv-safe/config";
import path from "path";
import { createConnection } from "typeorm";
import { Locale } from "./entities/Locale";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Locale],
  });

  console.log(conn);
};

main();
