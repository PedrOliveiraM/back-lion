import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private ProjectModel: Model<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.ProjectModel(createProjectDto);
    return createdProject.save();
  }

  findAll() {
    return this.ProjectModel.find();
  }

  findOne(id: string) {
    return this.ProjectModel.findOne({
      _id: id,
    });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.ProjectModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateProjectDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.ProjectModel.findByIdAndDelete({
      _id: id,
    });
  }
}
