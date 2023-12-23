import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { isLoggedInGuard } from './guards/login.guard'

import { ArticleListComponent   } from './components/article-list/article-list.component'
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
    { path: 'profile'     , component: ProfileComponent      , canActivate: [isLoggedInGuard] },
    { path: 'login'       , component: LoginComponent        , canActivate: []                },
    { path: 'logout'      , component: LogoutComponent       , canActivate: [isLoggedInGuard] },
    { path: 'contact'     , component: ContactComponent      , canActivate: []                },
    { path: 'articles'    , component: HomeComponent         , canActivate: []                },
    { path: 'articles/new', component: ArticleFormComponent  , canActivate: [isLoggedInGuard] },
    { path: 'articles/:id', component: ArticleComponent      , canActivate: []                },
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
