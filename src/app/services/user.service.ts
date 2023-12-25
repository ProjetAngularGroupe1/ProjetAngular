import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { UserDataModel } from '../models/user.model'
import { LocalStorageService } from '../services/local-storage.service'
import { MockDataService } from '../services/mock-data.service'
import { Subject } from 'rxjs'

@Injectable()
export class UserService {
    private logOutSignalSource = new Subject<any>()
    private logInSignalSource = new Subject<any>()

    logOutSignal$ = this.logOutSignalSource.asObservable()
    logInSignal$  = this.logInSignalSource.asObservable()

    constructor (
        private localStorageService: LocalStorageService, 
        private mockDataService: MockDataService
    ) {}

    getAllUsers(): Observable<UserDataModel[]> {
        return of(this.mockDataService.mockUserList).pipe(delay(500))
    }

    // rename getLoggedUser ?
    getCurrentUser(): Observable<UserDataModel> {
        // TODO: get user from localstorage ?
        return of(this.mockDataService.mockUserList[1]).pipe(delay(500))
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

        this.mockDataService.mockUserList.forEach((u: UserDataModel): void => {
            if (u.username == username && u.password == password) {
                isUser = true
                return
            }
        }) 

        return isUser
    }
}
