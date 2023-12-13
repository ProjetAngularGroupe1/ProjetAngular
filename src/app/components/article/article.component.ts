import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    constructor(private route: ActivatedRoute) {}

    my_id: string = "";

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let id = params.get('id');
            if (id) {
                this.my_id = id;
            }
        })
    }
}
