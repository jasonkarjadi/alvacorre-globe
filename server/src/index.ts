import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import express from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Locale } from "./entities/Locale";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Locale],
  });

  console.log("conn.options: ", conn.options);

  const app = express();

  app.set("trust proxy", 1);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:4000");
  });
};

main();
