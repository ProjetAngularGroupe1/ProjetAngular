import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { UserService } from '../services/user.service'

export const isLoggedInGuard: CanActivateFn = () => {
    const router      = inject(Router);
    const userService = inject(UserService)

    let loggedIn: boolean = userService.isLoggedIn()

    if (!loggedIn) {
        router.navigate(['/403'])
    }

    return loggedIn;
}
