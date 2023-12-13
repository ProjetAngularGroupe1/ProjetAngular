import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { FirstPipe } from'./pipes/first.pipe';
import { FirstService } from "./services/first.service"
import { FirstDirective } from'./directives/first.directive';

import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { CommentComponent } from './components/comment/comment.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';


@NgModule({
  declarations: [
    FirstDirective,
    FirstPipe,
    AppComponent,
    CommentComponent,
    ArticleComponent,
    ArticleListComponent,
    CommentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FirstService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
