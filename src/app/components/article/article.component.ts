import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute } from '@angular/router'

import { CommentModel } from '../../models/comment.model'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    isLoggedIn: boolean = false

    article_id: string = ""

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            let id = params.get('id')
            if (id) {
                this.article_id = id
            }
        })

        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    getComment(comment: CommentModel) {
        console.log(comment)
    }
}
