import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel(Enterprise.name) private EnterpriseModel: Model<Enterprise>,
  ) {}

  create(createEnterpriseDto: CreateEnterpriseDto) {
    const createdEnterprise = new this.EnterpriseModel(createEnterpriseDto);
    return createdEnterprise.save();
  }

  findAll() {
    return this.EnterpriseModel.find();
  }

  findOne(id: string) {
    return this.EnterpriseModel.findById(id).exec();
  }

  update(id: string, updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.EnterpriseModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateEnterpriseDto,
      },
      {
        new: true,
      },
    ).exec();
  }

  remove(id: string) {
    return this.EnterpriseModel.findByIdAndDelete({
      _id: id,
    }).exec();
  }
}
