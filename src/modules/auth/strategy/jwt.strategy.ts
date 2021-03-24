import { UserEntity } from './../../user/entity/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: 'asdfdfd',
    });
  }

  async validate(payload) {
    const { email } = payload;
    const user = this.userRepository.find({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
