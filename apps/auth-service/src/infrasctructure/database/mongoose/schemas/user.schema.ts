import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { AuthType } from '../../../../domain/enums/auth-type.enum';
import { Role } from '../../../../domain/enums/role.enum';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  id: true,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: null, type: String })
  hash: string | null;

  @Prop({ default: [Role.USER] })
  roles: Role[];

  @Prop({
    default: AuthType.DEFAULT,
    type: String,
    enum: Object.values(AuthType),
    required: true,
  })
  authType: AuthType;

  // === MFA fields ===
  @Prop({ default: false })
  isMfaEnabled: boolean;

  @Prop({ required: false, default: null, type: String })
  mfaSecret: string | null;

  @Prop({ type: [String], default: [] })
  mfaRecoveryCodes: string[];

  // === SSO fields ===

  @Prop({ required: false, default: null, type: String })
  provider: string | null;

  @Prop({ required: false, default: null, type: String })
  providerId: string | null;

  @Prop({ default: false })
  ssoEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User &
  Document & {
    created_at: Date;
    updated_at: Date;
  };

export type UserModel = Model<UserDocument>;
