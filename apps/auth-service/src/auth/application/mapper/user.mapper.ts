import { UserEntity } from '@app/common/auth/domain/entities/user.entity';
import { UserDocument } from '@app/common/auth/infrastructure/schemas/user.schema';

export class UserMapper {
  static toEntity(doc: UserDocument): UserEntity {
    return new UserEntity(
      doc.email,
      doc.hash,
      doc.roles,
      doc.authType,
      doc.isMfaEnabled,
      doc.mfaSecret,
      doc.mfaRecoveryCodes,
      doc.provider,
      doc.providerId,
      doc.ssoEmailVerified,
    );
  }

  static toPersistence(entity: UserEntity) {
    return {
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
  }
}
