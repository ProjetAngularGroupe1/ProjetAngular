import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'
import { LocalStorageService } from '../services/local-storage.service'
import { Subject } from 'rxjs'

@Injectable()
export class UserService {
    private logOutSignalSource = new Subject<any>()
    private logInSignalSource = new Subject<any>()

    logOutSignal$ = this.logOutSignalSource.asObservable()
    logInSignal$  = this.logInSignalSource.asObservable()

    mockUserList: Array<UserModel> = [
        new UserModel('admin', 'password', 'admin@test.com'),
        new UserModel('Rick', 'password', 'rick@test.com'),
        new UserModel('James', 'password', 'james@test.com'), 
        new UserModel('Alan', 'password', 'alan@test.com'),
    ]

    constructor (private localStorageService: LocalStorageService) {}

    getAllUsers(): Observable<Array<UserModel>> {
        return of(this.mockUserList).pipe(delay(1000))
    }

    logIn(): void {
        this.localStorageService.saveData('loggedUser', true)
        this.logInSignalSource.next(null)
    }

    logOut(): void {
        this.localStorageService.removeData('loggedUser')
        this.logOutSignalSource.next(null)
    }

    isLoggedIn(): boolean {
        var isLoggedIn = this.localStorageService.getData('loggedUser')
        return isLoggedIn ? true : false
    }

    isUser(username: string, password: string): boolean {
        let isUser: boolean = false

        this.mockUserList.forEach((u: UserModel): void => {
            if (u.username == username && u.password == password) {
                isUser = true
                return
            }
        }) 

        return isUser
    }
}
