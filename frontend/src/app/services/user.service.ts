import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'
import { LocalStorageService } from '../services/local-storage.service'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { IUser, IUserLoginDto } from "@blog/shared"

@Injectable()
export class UserService {
    private logOutSignalSource = new Subject<any>()
    private logInSignalSource  = new Subject<any>()

    logOutSignal$ = this.logOutSignalSource.asObservable()
    logInSignal$  = this.logInSignalSource.asObservable()

    constructor (
        private localStorageService: LocalStorageService, 
        private http: HttpClient,
    ) {}

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>('http://localhost:3000/users/')
    }

    async logIn(username: string, password: string): Promise<boolean> {
        const userDto = await this.http.post<IUserLoginDto>('http://localhost:3000/users/login', { username: username, password: password })

        if (userDto) { 
          this.localStorageService.saveData('loggedUser', userDto)
          this.logInSignalSource.next(null)
          return true
        } else {
          return false
        }
    }

    logOut(): void {
        this.localStorageService.removeData('loggedUser')
        this.logOutSignalSource.next(null)
    }

    isLoggedIn(): boolean {
        var isLoggedIn = this.localStorageService.getData('loggedUser')
        return isLoggedIn ? true : false
    }

    getLoggedUser(): any {
      return this.localStorageService.getData('loggedUser')
    }
}
