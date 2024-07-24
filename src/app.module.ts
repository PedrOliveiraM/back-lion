import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterprisesModule } from './enterprises/enterprises.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pedrodev:9j6u2BF2bhshTJuR@crudnest.vzjqsu9.mongodb.net/test',
    ),
    UsersModule,
    EnterprisesModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
