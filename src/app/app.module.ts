import { NgModule               } from '@angular/core';
import { BrowserModule          } from '@angular/platform-browser';
import { ReactiveFormsModule    } from '@angular/forms';
import { AppRoutingModule       } from './app-routing.module';
import { ArticleService         } from './services/article.service'
import { CommentService         } from './services/comment.service'
import { UserService            } from './services/user.service'
import { LocalStorageService    } from './services/local-storage.service'
import { FirstPipe              } from './pipes/first.pipe';
import { HightlightDirective    } from './directives/highlight.directive';
import { AppComponent           } from './app.component';
import { ArticleComponent       } from './components/article/article.component';
import { CommentComponent       } from './components/comment/comment.component';
import { ArticleListComponent   } from './components/article-list/article-list.component';
import { CommentListComponent   } from './components/comment-list/comment-list.component';
import { PageNotFoundComponent  } from './components/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component';
import { ProfileComponent       } from './components/profile/profile.component';
import { CommentFormComponent   } from './components/comment-form/comment-form.component';
import { ArticleFormComponent   } from './components/article-form/article-form.component';
import { LoginComponent         } from './components/login/login.component';
import { LogoutComponent        } from './components/logout/logout.component';

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
    PageForbiddenComponent,
    ProfileComponent,
    CommentFormComponent,
    ArticleFormComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ArticleService,
    CommentService,
    UserService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
