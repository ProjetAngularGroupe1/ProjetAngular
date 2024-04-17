import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IComment } from 'shared';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-my-dynamic-form',
    templateUrl: './my-dynamic-form.component.html',
    styleUrls: ['./my-dynamic-form.component.css']
})
export class MyDynamicFormComponent implements OnInit, OnDestroy {
    commentForm: FormGroup = this.fb.group({
      comments: this.fb.array([])
    });
    commentSubscribe!: Subscription;
    isLoaded: boolean = false;
  
    constructor(
        private fb: FormBuilder,
        private commentService: CommentService,
    ) { }
  
    ngOnDestroy(): void {
      if (this.commentSubscribe) {
        this.commentSubscribe.unsubscribe();
      }
    }
  
    ngOnInit(): void {
      if (!this.commentSubscribe) {
        // this.commentSubscribe = this.onlineStatusService.connectionChanged.subscribe(isOnline => {
        //   if (isOnline) {
        //     this.sendItemsFromIndexedDb();
        //     console.log('online');
        //   } else {
        //     console.log('offline');
        //   }
        // });
      }
  
      this.commentService.getAllComments().subscribe(res => {
        for (const comment of res) {
          this.addCommentForm(comment);
        }
        this.isLoaded = true;
      });
    }
  
    myCommentForm(): FormArray {
      return this.commentForm.get('comments') as FormArray;
    }
  
    addCommentForm(comment: IComment): void {
      if (comment) {
        const heroForm = this.fb.group({
          id: [comment.id],
          body: [comment.body],
        });
        this.myCommentForm().push(heroForm);
      }
    }
  
    deleteHeroForm(heroIndex: number): void {
      this.myCommentForm().removeAt(heroIndex);
    }
  
    // async listAllHeroes(): Promise<Array<IComment>> {
    //   return await db.comments.where({}).toArray();
    // }
  
    // async addItemToIndexedDb(comment: IComment): Promise<void> {
    //   await db.comments.add({ ...comment });
    // }
  
    private async sendItemsFromIndexedDb(): Promise<void> {
    //   const allItems: IComment[] = await db.comments.toArray();
    //   allItems.forEach((item: IComment) => {
        // Envoyer l'élément au backend...
        // this.commentService.addHero(item).subscribe(() => {
        //   db.comments.delete(item.id).then(() => {
        //     console.log(`L'élément ${item.id} a été envoyé et supprimé localement.`);
        //   });
        // });
    //   });
    }
  }