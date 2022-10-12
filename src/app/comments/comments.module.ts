import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { MaterialModule } from '@shared/material-module';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentComponent } from './comment/comment.component'
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsService } from './comments.service'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    CommentsRoutingModule,
    MaterialModule
  ],
  providers: [ CommentsService ],
  declarations: [
    CommentComponent,
    CommentListComponent,
    AddCommentComponent
  ]
})
export class CommentsModule { }
