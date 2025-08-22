import { AuthType } from '../enums/auth-type.enum';
import { Role } from '../enums/role.enum';

export class UserEntity {
  constructor(
    public id: string | null = '',
    public email: string,
    public hash: string | null = null,
    public roles: Role[] = [Role.USER],
    public authType: AuthType = AuthType.DEFAULT,
    public isMfaEnabled: boolean = false,
    public mfaSecret: string | null = null,
    public mfaRecoveryCodes: string[] = [],
    public provider: string | null = null,
    public providerId: string | null = null,
    public ssoEmailVerified: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  enableMfa(secret: string, recoveryCodes: string[]) {
    this.isMfaEnabled = true;
    this.mfaSecret = secret;
    this.mfaRecoveryCodes = recoveryCodes;
    this.authType = AuthType.DEFAULT_MFA;
    this.updatedAt = new Date();
  }

  disableMfa() {
    this.isMfaEnabled = false;
    this.mfaSecret = null;
    this.mfaRecoveryCodes = [];
    this.authType = AuthType.DEFAULT;
    this.updatedAt = new Date();
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

  updateHash(newHash: string): void {
    this.hash = newHash;
    this.updatedAt = new Date();
  }

  addRole(role: Role): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
      this.updatedAt = new Date();
    }
  }

  removeRole(role: Role): void {
    const initialLength = this.roles.length;
    this.roles = this.roles.filter((r) => r !== role);
    if (this.roles.length < initialLength) {
      this.updatedAt = new Date();
    }
  }
}
