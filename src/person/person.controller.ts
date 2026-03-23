import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';
import { agent } from 'supertest';
import { ApiException } from 'src/Errors/ApiException';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Person[] {
    return this.personService.findAll();
  }

  @Post()
  create(@Body() incomeData: CreatePersonDto) {
    return this.personService.create(incomeData);
  }

  @Get(':id')
  findSingleById(@Req() req, @Param('id') id: string) {
    const userAgent = req.headers['user-agent'].toLowerCase().split(' ');
    console.log(userAgent);
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
}
