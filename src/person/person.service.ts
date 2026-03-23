import { Injectable } from '@nestjs/common';
import { Person } from './dto/person.entity';

@Injectable()
export class PersonService {
  persons: Person[] = [];

  public findAll(): Person[] {
    return this.persons;
  }
}
