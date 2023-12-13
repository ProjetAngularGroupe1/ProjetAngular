import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleComponent } from './components/article/article.component';
import { CommentComponent } from './components/comment/comment.component';

const routes: Routes = [
  {path:'',component: ArticleListComponent  },
  {path: 'articles', component: ArticleListComponent },
  {path: 'articles/:id', component: ArticleComponent},
  {path: 'comments/:id', component: CommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
