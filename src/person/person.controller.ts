import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Person[] {
    return this.personService.findAll();
  }

  @Post()
  create(@Req() req, @Body() incomeData: CreatePersonDto) {
    if (req.headers['content-type'] === 'application/json')
      console.log('Working fine');

    return this.personService.create(incomeData);
  }

  @Post('/dummy')
  dummyPost(@Body() data) {
    // This show undefine
    // Check main.ts
    console.log(data);
  }

  // Here order matters
  // If I move this function after :id, then :id will be invoked, and it won’t get a chance to run, so keep this in mind.
  @Get('/short')
  findSinglePerson(@Query('name') name: string, @Query('id') id: number) {
    console.log(name, id);
    return 'Found';
  }

  @Get(':id')
  findSingleById(@Req() req, @Param('id') id: string) {
    //This will block the incomming request from the mac os
    /*
    if (userAgent.includes('mac')) {
        throw new ApiException("You can't allow here Fuck off", 500);
    }
    */

    // If we use this then we have to send accept mannual on FE
    // if (req.headers.accept !== 'application/json')
    //   throw new ApiException(`can't work with headers accept`, 500);

    return this.personService.findSinglePerson(Number(id));
  }

  @Put(':id')
  modifyPerson(@Param('id') id: string, @Body() data: CreatePersonDto) {
    return this.personService.modifySinglePerson(Number(id), data);
  }
}
