import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save(); // save new user in bd
  }

  findAll() {
    // i am implement a method to return all users from the database
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    // i'm implementing a method to return a user by id
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateUserDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    if (this.userModel.deleteOne({ _id: id }).exec()) {
      return 'User deleted successfully';
    }
  }
}
