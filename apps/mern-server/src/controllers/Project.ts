import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Project from '../models/Project'

const createProject = (req: Request, res: Response, next: NextFunction) => {
  const { name, creator } = req.body

  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name,
    creator,
  })
  return project
    .save()
    .then((projectProp) =>
      res.status(201).json({ project: projectProp }))
    .catch((error) => res.status(500).json({ error }))
}
const readProject = (req: Request, res: Response, next: NextFunction) => {
  const projectId = req.params.projectId

  return Project.findById(projectId)
    .populate('creator')
    .then((project) => project ? res.status(200).json({ project }) : res.status(404).json({ message: 'Not Found' }))
    .catch((error) => res.status(500).json({ error }))
}
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Project.find()
    .populate('creator')
    .select('-__v')
    .then((projects) => res.status(200).json({ projects }))
    .catch((error) => res.status(500).json({ error }))
}
const updateProject = (req: Request, res: Response, next: NextFunction) => {
  const projectId = req.params.projectId

  return Project.findById(projectId)
    .then((project) => {
      if (project) {
        project.set(req.body)

        return project
          .save()
          .then((projectProp) =>
            res.status(201).json({ project: projectProp }))
          .catch((error) => res.status(500).json({ error }))
      } else {
        res.status(404).json({ message: 'Not Found' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
const deleteProject = (req: Request, res: Response, next: NextFunction) => {
  const projectId = req.params.projectId
  return Project.findByIdAndDelete(projectId)
    .then((project) => project
      ? res.status(201).json({ message: 'deleted' })
      : res.status(404).json({ message: 'Not Found' }))
    .catch((error) => res.status(500).json({ error }))
}

export default { createProject, readProject, readAll, updateProject, deleteProject }
