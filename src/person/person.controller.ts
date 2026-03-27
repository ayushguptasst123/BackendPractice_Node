import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';

/** Controller level validation
 *
 * @UsePipes(
 *  new ValidationPipe({
 *    whitelist: true,
 *    forbidNonWhitelisted: true,
 *  }),
 *)
 */
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
    console.log(incomeData);
    return this.personService.create(incomeData);
  }

  /** Apply pipes to a single route
   * @UsePipes(
   *    new ValidationPipe({
   *      whitelist: true,
   *      forbidNonWhitelisted: true,
   *    }),
   *  )
   */
  @Post('/dummy')
  dummyPost(
    // Apply to the body
    @Body(
      // new ValidationPipe({
      //   whitelist: true,
      //   forbidNonWhitelisted: true,
      //   enableDebugMessages: true,
      //   exceptionFactory: (errors) => {
      //     const formattedError = [];

      //     errors.forEach((err) => {
      //       console.log(err);
      //     });
      //   },
      // }),
    )
    data: CreatePersonDto,
  ) {
    console.log(data);
    return data;
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
    //This will block the incoming request from the mac os
    /*
    if (userAgent.includes('mac')) {
        throw new ApiException("You can't allow here Fuck off", 500);
    }
    */

    // If we use this then we have to send accept manual on FE
    // if (req.headers.accept !== 'application/json')
    //   throw new ApiException(`can't work with headers accept`, 500);

    return this.personService.findSinglePerson(Number(id));
  }

  @Put(':id')
  modifyPerson(@Param('id') id: string, @Body() data: CreatePersonDto) {
    return this.personService.modifySinglePerson(Number(id), data);
  }

  @Delete(':id')
  deletePerson(@Param('id') id: string) {
    return this.personService.deleteSinglePerson(Number(id));
  }

  @Get('/delete/:id')
  deletePersonByGet(@Param('id') id: string) {
    return this.personService.deleteByGetMethod(Number(id));
  }
}
