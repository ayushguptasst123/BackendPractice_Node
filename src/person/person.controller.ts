import { Controller, Get } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './dto/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Person[] {
    return this.personService.findAll();
  }
}
