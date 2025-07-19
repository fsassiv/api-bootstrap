import { Types } from 'mongoose';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { User, UserDocument } from '../schemas/user.schema';

export class UserMapper {
  static toDomain(userDoc: UserDocument): UserEntity {
    const id = (userDoc._id as Types.ObjectId).toString();

    const entity = new UserEntity(
      id,
      userDoc.email,
      userDoc.hash || null,
      userDoc.roles,
      userDoc.authType,
      userDoc.isMfaEnabled,
      userDoc.mfaSecret || null,
      userDoc.mfaRecoveryCodes,
      userDoc.provider || null,
      userDoc.providerId || null,
      userDoc.ssoEmailVerified,
      userDoc.created_at,
      userDoc.updated_at,
    );
    return entity;
  }

  static toPersistence(entity: UserEntity): User {
    const persistence: User = {
      email: entity.email,
      hash: entity.hash,
      roles: entity.roles,
      authType: entity.authType,
      isMfaEnabled: entity.isMfaEnabled,
      mfaSecret: entity.mfaSecret,
      mfaRecoveryCodes: entity.mfaRecoveryCodes,
      provider: entity.provider,
      providerId: entity.providerId,
      ssoEmailVerified: entity.ssoEmailVerified,
    };
    return persistence;
  }
}
