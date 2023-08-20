import mongoose, { Document, Schema } from 'mongoose'

export interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  active: boolean;
  activationLink: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    activationLink: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    versionKey: false,
  },
)

export default mongoose.model<IUserModel>('User', UserSchema);
