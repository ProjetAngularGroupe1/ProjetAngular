import { NgModule            } from '@angular/core';

import { BrowserModule       } from '@angular/platform-browser';
import { AppRoutingModule    } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleService } from "./services/article.service"
import { CommentService } from "./services/comment.service"

import { FirstPipe } from'./pipes/first.pipe';

import { HightlightDirective } from'./directives/highlight.directive';

import { AppComponent          } from './app.component';
import { ArticleComponent      } from './components/article/article.component';
import { CommentComponent      } from './components/comment/comment.component';
import { ArticleListComponent  } from './components/article-list/article-list.component';
import { CommentListComponent  } from './components/comment-list/comment-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent      } from './components/profile/profile.component';
import { CommentFormComponent  } from './components/comment-form/comment-form.component';


@NgModule({
  declarations: [
    FirstPipe,
    HightlightDirective,
    AppComponent,
    CommentComponent,
    ArticleComponent,
    ArticleListComponent,
    CommentListComponent,
    PageNotFoundComponent,
    ProfileComponent,
    CommentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ArticleService,
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
