import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './modules/expense/expense.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities:
        process.env.DB_AUTO_LOAD_ENTITIES === 'true' ? true : false,
      synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
      logging: process.env.DB_LOGGING === 'true' ? true : false,
    }),
    ExpenseModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
