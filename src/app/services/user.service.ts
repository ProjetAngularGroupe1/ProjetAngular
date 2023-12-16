import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from '../services/local-storage.service'
import { Subject } from 'rxjs';

@Injectable()
export class UserService {
    private logOutSignalSource = new Subject<any>();
    private logInSignalSource = new Subject<any>();

    logOutSignal$ = this.logOutSignalSource.asObservable();
    logInSignal$ = this.logInSignalSource.asObservable();

    mockUserList: Array<UserModel> = [
        new UserModel('Rick', 'pasword', 'rick@test.com'),
        new UserModel('James', 'pasword', 'james@test.com'), 
        new UserModel('Alan', 'pasword', 'alan@test.com'),
    ]

    constructor (private localStorageService: LocalStorageService) {}

    getAllUsers(): Observable<Array<UserModel>> {
        return of(this.mockUserList).pipe(delay(1000));
    }

    logIn(): void {
        this.localStorageService.saveData('isLoggedIn', 'true')
        this.logInSignalSource.next(null);
    }

    logOut(): void {
        this.localStorageService.removeData('isLoggedIn')
        this.logOutSignalSource.next(null);
    }

    isLoggedIn(): boolean {
        var isLoggedIn = this.localStorageService.getData('isLoggedIn')
        return isLoggedIn ? true : false;
    }
}
