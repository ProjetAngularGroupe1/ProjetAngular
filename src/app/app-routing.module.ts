import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleComponent } from './components/article/article.component';
import { CommentComponent } from './components/comment/comment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    { path: ''            , component: ArticleListComponent },
    { path: 'profile'     , component: ProfileComponent     },
    { path: 'articles'    , component: ArticleListComponent },
    { path: 'articles/:id', component: ArticleComponent     },
    { path: 'comments/:id', component: CommentComponent     },
    { path: '**'          , pathMatch: 'full', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
