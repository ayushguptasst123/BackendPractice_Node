import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  create(@Body() incomeData: CreatePersonDto) {
    return this.personService.create(incomeData);
  }

  @Get(':id')
  findSingleById(@Param('id') id: string) {
    return this.personService.findSinglePerson(Number(id));
  }
}
