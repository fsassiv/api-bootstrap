import { AuthType } from '../enums/auth-type.enum';
import { Role } from '../enums/role.enum';

export class UserEntity {
  public id: string;
  public email: string;
  public hash: string | null;
  public roles: Role[];
  public authType: AuthType;
  public isMfaEnabled: boolean;
  public mfaSecret: string | null;
  public mfaRecoveryCodes: string[];
  public provider: string | null;
  public providerId: string | null;
  public ssoEmailVerified: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string | null = null,
    email: string,
    hash: string | null = null,
    roles: Role[] = [Role.USER],
    authType: AuthType = AuthType.DEFAULT,
    isMfaEnabled: boolean = false,
    mfaSecret: string | null = null,
    mfaRecoveryCodes: string[] = [],
    provider: string | null = null,
    providerId: string | null = null,
    ssoEmailVerified: boolean = false,
    createdAt: Date | null = null,
    updatedAt: Date | null = null,
  ) {
    this.id = id || '';
    this.email = email;
    this.hash = hash;
    this.roles = roles;
    this.authType = authType;
    this.isMfaEnabled = isMfaEnabled;
    this.mfaSecret = mfaSecret;
    this.mfaRecoveryCodes = mfaRecoveryCodes;
    this.provider = provider;
    this.providerId = providerId;
    this.ssoEmailVerified = ssoEmailVerified;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

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
