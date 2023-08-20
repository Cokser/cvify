import mongoose, { Document, Schema } from 'mongoose'

export interface IToken {
  user: string;
  refreshToken: string;
}

export interface ITokenModel extends IToken, Document {
}

const TokenSchema: Schema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    refreshToken: {
      type: String,
      required: true,
    },
  }
);

export default mongoose.model<ITokenModel>('Token', TokenSchema)
