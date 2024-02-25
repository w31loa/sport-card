import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:`${process.cwd()}/.env`
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true
    }),
    ProvidersModule, 
    UserModule
  ],
})
export class AppModule { }
