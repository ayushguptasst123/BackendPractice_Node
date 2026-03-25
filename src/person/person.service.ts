import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './dto/person.entity';
import { CreatePersonDto } from './dto/create-person-dto';
import { ApiException } from 'src/Errors/ApiException';

@Injectable()
export class PersonService {
  persons: Person[] = [
    {
      id: 1,
      name: 'Ayush',
    },
  ];

  private idCounter: number = 2;

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

  public modifySinglePerson(id: number, data: CreatePersonDto): Person {
    const currPerson = this.persons.find((p) => p.id === id);

    if (!currPerson)
      throw new ApiException(`Can't find Person with id: ${id}`, 404);

    currPerson.name = data.name;

    return currPerson;
  }

  public deleteSinglePerson(id: number): string {
    const afterDelete = this.persons.filter((p) => p.id !== id);

    if (this.persons.length === afterDelete.length)
      throw new ApiException(
        `Can't delete the Person with id: ${id}. Please double check the id`,
        500,
      );
    else this.persons = afterDelete;

    return 'Success';
  }

  public deleteByGetMethod(id: number): string {
    const afterDelete = this.persons.filter((p) => p.id !== id);

    if (this.persons.length === afterDelete.length)
      throw new ApiException(
        `Can't delete the Person with id: ${id}. Please double check the id`,
        500,
      );
    else this.persons = afterDelete;

    return 'Success';
  }
}
