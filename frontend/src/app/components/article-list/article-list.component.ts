import { Component, OnInit, Input } from '@angular/core'
import { ArticleModel } from '../../models/article.model'


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    @Input() 
    articles!: ArticleModel[] | null 

    constructor () {}

    ngOnInit(): void {

    }
}
