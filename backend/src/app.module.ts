import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './modules/expense/expense.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UtilsModule } from './modules/uitls/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities:
        process.env.POSTGRES_AUTO_LOAD_ENTITIES === 'true' ? true : false,
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' ? true : false,
      logging: process.env.POSTGRES_LOGGING === 'true' ? true : false,
    }),
    ExpenseModule,
    AuthModule,
    UserModule,
    UtilsModule,
  ],
})
export class AppModule {}
