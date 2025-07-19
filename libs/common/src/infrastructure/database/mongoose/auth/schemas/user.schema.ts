import { AuthType } from '@app/common/domain/auth/enums/auth-type.enum';
import { Role } from '@app/common/domain/auth/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  id: true,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: null })
  hash?: string;

  @Prop({ default: [Role.USER] })
  roles: Role[];

  @Prop({
    default: AuthType.DEFAULT,
    type: String,
    enum: ['default', 'sso', 'default+mfa'],
    required: true,
  })
  authType: AuthType;

  // === MFA fields ===
  @Prop({ default: false })
  isMfaEnabled: boolean;

  @Prop({ required: false })
  mfaSecret?: string;

  @Prop({ type: [String], default: [] })
  mfaRecoveryCodes?: string[];

  // === SSO fields ===
  @Prop({ required: false })
  provider?: string;

  @Prop({ required: false })
  providerId?: string;

  @Prop({ default: false })
  ssoEmailVerified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
