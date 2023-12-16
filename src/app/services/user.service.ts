import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from '../services/local-storage.service'

@Injectable()
export class UserService {
    constructor (private localStorageService: LocalStorageService) {}

    mockUserList: Array<UserModel> = [
        new UserModel('Rick', 'pasword', 'rick@test.com'),
        new UserModel('James', 'pasword', 'james@test.com'), 
        new UserModel('Alan', 'pasword', 'alan@test.com'),
    ]

    getAllUsers(): Observable<Array<UserModel>> {
        return of(this.mockUserList).pipe(delay(1000));
    }

    logIn(): void {
        this.localStorageService.saveData('isLoggedIn', 'true')
    }

    logOut(): void {
        this.localStorageService.removeData('isLoggedIn')
    }

    isLoggedIn(): boolean {
        var isLoggedIn = this.localStorageService.getData('isLoggedIn')

        return isLoggedIn ? true : false;
    }
}
