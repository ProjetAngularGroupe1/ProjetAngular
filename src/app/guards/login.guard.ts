import { inject } from '@angular/core'
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router'

import { UserService } from '../services/user.service'
import { UserDataModel } from '../models/user.model'
import { Observable } from 'rxjs'

export const isLoggedInCanActivateGuard: CanActivateFn = (): boolean => {
    const router      = inject(Router)
    const userService = inject(UserService)

    let loggedIn: boolean = userService.isLoggedIn()

    if (!loggedIn) {
        router.navigate(['/403'])
    }

    return loggedIn
}

export const logginResolveGuard: ResolveFn<UserDataModel> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDataModel> => {
      return inject(UserService).getCurrentUser()
}