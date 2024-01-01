import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ArticleModel } from 'src/app/models/article.model'
import { CommentModel } from 'src/app/models/comment.model'
import { UserModel } from 'src/app/models/user.model'
import { ArticleService } from 'src/app/services/article.service'
import { CommentService } from 'src/app/services/comment.service'
import { UserService } from 'src/app/services/user.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    isArticlesLoaded: boolean = false
    isCommentsLoaded: boolean = false
    user!: UserModel
    articles!: ArticleModel[]
    comments!: CommentModel[]

    constructor (
        private activatedRoute: ActivatedRoute, 
        private userService: UserService,  
        private articleService: ArticleService, 
        private commentService: CommentService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data) => { 
                this.user = data['user']
        
                this.articleService.getAllUserArticles(this.user.id).subscribe((articles) => {
                    this.isArticlesLoaded = true
                    this.articles = articles
                })
        
                this.commentService.getAllUserComments(this.user.id).subscribe((comments) => {
                    this.isCommentsLoaded = true
                    this.comments = comments
                })
        })
    }
}
