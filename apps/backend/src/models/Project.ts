import mongoose, { Document, Schema } from 'mongoose'

export interface IProject {
  name: string;
  creator: string;
}

export interface IProjectModel extends IProject, Document {}

const ProjectSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  }, {
    timestamps: true,
  },
)

export default mongoose.model<IProjectModel>('Project', ProjectSchema);
