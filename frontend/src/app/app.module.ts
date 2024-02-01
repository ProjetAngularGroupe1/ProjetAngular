import { NgModule, isDevMode    } from '@angular/core'
import { ServiceWorkerModule    } from '@angular/service-worker'
import { BrowserModule          } from '@angular/platform-browser'
import { HttpClientModule       } from '@angular/common/http'
import { ReactiveFormsModule    } from '@angular/forms'
import { AppRoutingModule       } from './app-routing.module'
import { ArticleService         } from './services/article.service'
import { CommentService         } from './services/comment.service'
import { UserService            } from './services/user.service'
import { LocalStorageService    } from './services/local-storage.service'
import { IndexedDBService       } from './services/indexed-db.service'
import { JwtService             } from './services/jwt.service'
import { ArticleDatePipe        } from './pipes/article-date.pipe'
import { OrderByPipe            } from './pipes/order-by.pipe'
import { HightlightDirective    } from './directives/highlight.directive'
import { AppComponent           } from './app.component'
import { ArticleComponent       } from './components/article/article.component'
import { CommentComponent       } from './components/comment/comment.component'
import { ArticleListComponent   } from './components/article-list/article-list.component'
import { CommentListComponent   } from './components/comment-list/comment-list.component'
import { PageNotFoundComponent  } from './components/page-not-found/page-not-found.component'
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component'
import { ProfileComponent       } from './components/profile/profile.component'
import { CommentEditComponent   } from './components/comment-edit/comment-edit.component'
import { ArticleNewComponent    } from './components/article-new/article-new.component'
import { ArticleEditComponent   } from './components/article-edit/article-edit.component'
import { LoginComponent         } from './components/login/login.component'
import { LogoutComponent        } from './components/logout/logout.component'
import { ContactComponent       } from './components/contact/contact.component'
import { HeaderComponent        } from './components/header/header.component'
import { FooterComponent        } from './components/footer/footer.component'
import { NavbarComponent        } from './components/navbar/navbar.component'
import { HomeComponent          } from './components/home/home.component';

@NgModule({
  declarations: [
    ArticleDatePipe,
    OrderByPipe,
    HightlightDirective,
    AppComponent,
    CommentComponent,
    ArticleComponent,
    ArticleListComponent,
    CommentListComponent,
    PageNotFoundComponent,
    PageForbiddenComponent,
    ProfileComponent,
    CommentEditComponent,
    ArticleNewComponent,
    ArticleEditComponent,
    LoginComponent,
    LogoutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    ArticleService,
    CommentService,
    UserService,
    LocalStorageService,
    IndexedDBService,
    JwtService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
