import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';
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
    console.log(req.headers.accept);

    if (req.headers.accept !== 'application/json')
      throw new ApiException(`can't accept this header`, 500);
    return this.personService.findSinglePerson(Number(id));
  }
}
