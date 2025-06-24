import { AuthType } from '../enums/auth-type.enum';
import { Role } from '../enums/role.enum';

export class UserEntity {
  constructor(
    public readonly email: string,
    public hash: string | null = null,
    public roles: Role[] = [Role.USER],
    public authType: AuthType = AuthType.DEFAULT,
    public isMfaEnabled: boolean = false,
    public mfaSecret: string | null = null,
    public mfaRecoveryCodes: string[] = [],
    public provider: string | null = null,
    public providerId: string | null = null,
    public ssoEmailVerified: boolean = false,
  ) {}

  enableMfa(secret: string, recoveryCodes: string[]) {
    this.isMfaEnabled = true;
    this.mfaSecret = secret;
    this.mfaRecoveryCodes = recoveryCodes;
    this.authType = AuthType.DEFAULT_MFA;
  }

  disableMfa() {
    this.isMfaEnabled = false;
    this.mfaSecret = null;
    this.mfaRecoveryCodes = [];
    this.authType = AuthType.DEFAULT;
  }

  isSsoUser(): boolean {
    return this.authType === AuthType.SSO;
  }

  isDefaultUser(): boolean {
    return (
      this.authType === AuthType.DEFAULT ||
      this.authType === AuthType.DEFAULT_MFA
    );
  }
}
