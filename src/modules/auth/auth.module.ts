import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entity/user.entity';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "24h" }
            })
        }),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
