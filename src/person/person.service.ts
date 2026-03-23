import { Injectable } from '@nestjs/common';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';

@Injectable()
export class PersonService {
  persons: Person[] = [];
  private idCounter: number = 1;

  public findAll(): Person[] {
    return this.persons;
  }

  public create(incomeDto: CreatePersonDto): Person {
    const person: Person = {
      id: this.idCounter,
      name: incomeDto.name,
    };
    this.idCounter++;
    this.persons.push(person);
    return person;
  }
}
