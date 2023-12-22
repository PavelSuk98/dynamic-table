import { faker } from '@faker-js/faker';
import { Injectable } from '@angular/core';
import { UserTableModel } from '../models/user.dto';
import { of } from 'rxjs';

export function createRandomUser(): UserTableModel {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const USERS: UserTableModel[] = faker.helpers.multiple(createRandomUser, {
  count: 200,
});
@Injectable({ providedIn: 'root' })
export class MockDataService {

  getUsers() {
    return USERS;
  }

}


