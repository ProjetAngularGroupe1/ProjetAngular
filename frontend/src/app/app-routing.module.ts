import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { isLoggedInGuard, logginResolver } from './guards/login.guard'
import { canEditArticleGuard, canDeleteArticleGuard } from './guards/has-rights.guard'
import { ArticleComponent       } from './components/article/article.component'
import { ArticleNewComponent    } from './components/article-new/article-new.component'
import { ArticleEditComponent   } from './components/article-edit/article-edit.component'
import { ArticleDeleteComponent } from './components/article-delete/article-delete.component'
import { MyDynamicFormComponent } from './components/my-dynamic-form/my-dynamic-form.component'
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
    { path: 'dynamicform' , component: MyDynamicFormComponent, canActivate: []                },
    { path: 'profile'     , component: ProfileComponent      , canActivate: [isLoggedInGuard], resolve : { user: logginResolver } },
    { path: 'login'       , component: LoginComponent        , canActivate: []                },
    { path: 'logout'      , component: LogoutComponent       , canActivate: [isLoggedInGuard], resolve : { user: logginResolver } },
    { path: 'contact'     , component: ContactComponent      , canActivate: []                },
    { path: 'articles'    , children: [
            { path: ''          , component: HomeComponent         , canActivate: [] },
            { path: 'new'       , component: ArticleNewComponent   , canActivate: [isLoggedInGuard]                       , resolve : { user: logginResolver } },
            { path: ':id'       , component: ArticleComponent      , canActivate: []                                      , resolve : { user: logginResolver } },
            { path: ':id/edit'  , component: ArticleEditComponent  , canActivate: [isLoggedInGuard, canEditArticleGuard  ], resolve : { user: logginResolver } },
            { path: ':id/delete', component: ArticleDeleteComponent, canActivate: [isLoggedInGuard, canDeleteArticleGuard], resolve : { user: logginResolver } },
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
