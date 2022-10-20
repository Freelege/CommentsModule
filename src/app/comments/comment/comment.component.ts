import { Component, EventEmitter, ViewChild, Input, Output, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../@shared/auth.service';
import { User } from '@app/models/user.model';
import { Comment } from '../../models/comment.model';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @ViewChild('commentBox') commentBoxRef!: ElementRef;

  @ViewChild('content') contentRef!: ElementRef;

  @Input() value!: Comment;

  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  editMode: boolean = false;

  loggedInUser: User;

  replyingTo: string | undefined = '';

  constructor(private auth: AuthService, private dialog: MatDialog) {
    this.loggedInUser = auth.loggedInUser;
   }

  ngOnInit() {     
    this.replyingTo = this.value.replyingTo + ' ';
  }

  editComment = () => {
    this.editMode = true;
    this.commentBoxRef.nativeElement.contentEditable = 'true';
  }

  updateComment = () => {
    this.editMode = false;
    this.commentBoxRef.nativeElement.contentEditable = 'false';
    this.value.content = this.contentRef.nativeElement.innerText;

    this.updateEmitter.emit({ action: 'update', data: this.value });
  }

  confirmDeleteComment = () => {
    this.updateEmitter.emit({ action: 'delete', data: this.value });
  }

  increaseScore = () => {
    this.value.score += 1;
    this.updateEmitter.emit({ action: 'update', data: this.value });
  }

  decreaseScore = () => {
    if (this.value.score > 0) {
      this.value.score -= 1;
      this.updateEmitter.emit({ action: 'update', data: this.value });
    }    
  }

  reply = () => {
    this.value.isBeingReplied = true;
    this.updateEmitter.emit({ 
      action: 'reply', 
      data: {
        threadId: this.value.threadId ? this.value.threadId : this.value.id,
        replyingTo: this.value.user.username
      }});
  }
}
