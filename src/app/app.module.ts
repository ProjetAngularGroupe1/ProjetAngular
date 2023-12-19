import { NgModule               } from '@angular/core'
import { BrowserModule          } from '@angular/platform-browser'
import { HttpClientModule       } from '@angular/common/http'
import { ReactiveFormsModule    } from '@angular/forms'
import { AppRoutingModule       } from './app-routing.module'
import { ArticleService         } from './services/article.service'
import { CommentService         } from './services/comment.service'
import { UserService            } from './services/user.service'
import { LocalStorageService    } from './services/local-storage.service'
import { MockDataService        } from './services/mock-data.service'
import { ArticleDatePipe        } from './pipes/article-date.pipe'
import { HightlightDirective    } from './directives/highlight.directive'
import { AppComponent           } from './app.component'
import { ArticleComponent       } from './components/article/article.component'
import { CommentComponent       } from './components/comment/comment.component'
import { ArticleListComponent   } from './components/article-list/article-list.component'
import { CommentListComponent   } from './components/comment-list/comment-list.component'
import { PageNotFoundComponent  } from './components/page-not-found/page-not-found.component'
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component'
import { ProfileComponent       } from './components/profile/profile.component'
import { CommentFormComponent   } from './components/comment-form/comment-form.component'
import { ArticleFormComponent   } from './components/article-form/article-form.component'
import { LoginComponent         } from './components/login/login.component'
import { LogoutComponent        } from './components/logout/logout.component'
import { ContactComponent       } from './components/contact/contact.component'
import { HeaderComponent        } from './components/header/header.component'
import { FooterComponent        } from './components/footer/footer.component'
import { NavbarComponent        } from './components/navbar/navbar.component'

@NgModule({
  declarations: [
    ArticleDatePipe,
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
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ArticleService,
    CommentService,
    UserService,
    LocalStorageService,
    MockDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
