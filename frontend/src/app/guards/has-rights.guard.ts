import { inject } from '@angular/core'
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router'
import { UserService } from '../services/user.service'
import { ArticleService } from '../services/article.service'
import { firstValueFrom } from 'rxjs'
import { IArticle } from 'shared'

export const canEditArticleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
    const router      = inject(Router)
    const userService = inject(UserService)
    const articelService = inject(ArticleService)
    
    let loggedIn: boolean = userService.isLoggedIn()

    if (!loggedIn) {
        router.navigate(['/403'])
        return false;
    }

    const user = userService.getLoggedUser()

    const articleId = route.paramMap.get('id')

    if (!articleId) return false;

    const article: IArticle = await firstValueFrom(articelService.getArticle(parseInt(articleId)))

    if (article.userId !== user.id) {
        router.navigate(['/403'])
        return false;
    }

    return true
}

export const canDeleteArticleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
    const router      = inject(Router)
    const userService = inject(UserService)
    const articelService = inject(ArticleService)
    
    let loggedIn: boolean = userService.isLoggedIn()

    if (!loggedIn) {
        router.navigate(['/403'])
        return false;
    }

    const user = userService.getLoggedUser()

    const articleId = route.paramMap.get('id')

    if (!articleId) return false;

    const article: IArticle = await firstValueFrom(articelService.getArticle(parseInt(articleId)))

    if (article.userId !== user.id) {
        router.navigate(['/403'])
        return false;
    }

    return true
}