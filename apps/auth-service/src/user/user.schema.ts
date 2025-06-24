import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  id: true,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ default: [] })
  roles: string[];

  // For future

  // === MFA fields ===
  // @Prop({ default: false })
  // isMfaEnabled: boolean;

  // @Prop({ required: false })
  // mfaSecret?: string;

  // @Prop({ type: [String], default: [] })
  // mfaRecoveryCodes?: string[];

  // // === SSO fields ===
  // @Prop({ required: false })
  // provider?: string;

  // @Prop({ required: false })
  // providerId?: string;

  // @Prop({ default: false })
  // ssoEmailVerified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
