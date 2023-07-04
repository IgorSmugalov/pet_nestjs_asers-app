import { IntersectionType, PickType } from '@nestjs/swagger';
import { RegisteredJwtClaimsDTO } from './jwt-claims-registered.dto';
import { RefreshJwtClaims } from '../types';
import { plainToInstance } from 'class-transformer';
import { JWTPayload } from 'jose';
import { IsUUID } from 'class-validator';
import { UserDTO } from 'src/user/dto/user.dto';

class PartialUserEntity extends PickType(UserDTO, ['id']) {
  @IsUUID()
  id: string;
}

class PartialRegisteredClaims extends PickType(RegisteredJwtClaimsDTO, [
  'exp',
  'jti',
  'iat',
]) {}

export class RefreshJwtClaimsDTO
  extends IntersectionType(PartialRegisteredClaims, PartialUserEntity)
  implements RefreshJwtClaims
{
  static fromUser(user: UserDTO): RefreshJwtClaimsDTO {
    return plainToInstance(this, user, {
      strategy: 'excludeAll',
      exposeUnsetFields: false,
      exposeDefaultValues: true,
      enableImplicitConversion: true,
    });
  }
  static fromToken(jwt: JWTPayload) {
    return plainToInstance(this, jwt, {
      strategy: 'excludeAll',
      exposeDefaultValues: false,
      enableImplicitConversion: true,
    });
  }
}
