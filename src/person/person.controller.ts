import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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
    console.log(data);
  }

  @Get(':id')
  findSingleById(@Req() req, @Param('id') id: string) {
    console.log(req.route);
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
