import { inject } from '@angular/core'
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router'
import { UserService } from '../services/user.service'
import { UserModel } from '../models/user.model'
import { Observable } from 'rxjs'


export const canEditArticleCanActivateGuard: CanActivateFn = (): boolean => {
    const router      = inject(Router)
    const userService = inject(UserService)

    // TODO
    // get article userId
    // compare with logged user id

    let loggedIn: boolean = userService.isLoggedIn()

    if (!loggedIn) {
        router.navigate(['/403'])
    }

    return loggedIn
}