import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';

@Injectable()
export class PersonService {
  persons: Person[] = [
    {
      id: 1,
      name: 'Ayush',
    },
  ];
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

  public findSinglePerson(id: number): Person {
    const person = this.persons.find((p) => p.id === id);
    if (!person) throw new NotFoundException('Person not found');
    return person;
  }
}
