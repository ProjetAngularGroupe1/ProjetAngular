import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { isLoggedInCanActivateGuard, logginResolveGuard } from './guards/login.guard'
import { ArticleComponent       } from './components/article/article.component'
import { ArticleFormComponent   } from './components/article-form/article-form.component'
import { CommentComponent       } from './components/comment/comment.component'
import { PageNotFoundComponent  } from './components/page-not-found/page-not-found.component'
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component'
import { ProfileComponent       } from './components/profile/profile.component'
import { LoginComponent         } from './components/login/login.component'
import { LogoutComponent        } from './components/logout/logout.component'
import { ContactComponent       } from './components/contact/contact.component'
import { HomeComponent          } from './components/home/home.component'

const routes: Routes = [
    { path: ''            , component: HomeComponent         , canActivate: []                },
    { path: 'home'        , component: HomeComponent         , canActivate: []                },
    { path: 'profile'     , component: ProfileComponent      , canActivate: [isLoggedInCanActivateGuard], resolve : { user: logginResolveGuard } },
    { path: 'login'       , component: LoginComponent        , canActivate: []                },
    { path: 'logout'      , component: LogoutComponent       , canActivate: [isLoggedInCanActivateGuard], resolve : { user: logginResolveGuard } },
    { path: 'contact'     , component: ContactComponent      , canActivate: []                },
    { path: 'articles'    , children: [
            { path: ''   , component: HomeComponent         , canActivate: [] },
            { path: 'new', component: ArticleFormComponent  , canActivate: [isLoggedInCanActivateGuard], resolve : { user: logginResolveGuard } },
            { path: ':id', component: ArticleComponent      , canActivate: [isLoggedInCanActivateGuard], resolve : { user: logginResolveGuard } },
        ]
    },
    { path: 'comments/:id', component: CommentComponent      , canActivate: []                },
    { path: '404'         , component: PageNotFoundComponent , canActivate: []                },
    { path: '403'         , component: PageForbiddenComponent, canActivate: []                },
    { path: '**'          , component: PageNotFoundComponent , pathMatch: 'full'              },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
