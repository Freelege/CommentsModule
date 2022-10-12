import { Component, EventEmitter, Inject, Optional, ViewChild, Output, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../@shared/auth.service';
import { User } from '@app/models/user.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {  
  @ViewChild('comment') commentRef!: ElementRef;

  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();  

  loggedInUser: User;

  constructor(private auth: AuthService, @Optional() public dialogRef: MatDialogRef<AddCommentComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loggedInUser = auth.loggedInUser;
   }

  sendComment = () => {
    let content = this.commentRef.nativeElement.value;
    let comment: Comment = {
      id: 0,
      threadId: this.data.threadId,
      replyingTo: this.data.replyingTo,
      content: content,
      createdAt: new Date(),
      score: 0,
      user: this.loggedInUser,
      replies: undefined
    }
    this.updateEmitter.emit({ action: 'add', data: comment });
    this.dialogRef.close();
  }
}
