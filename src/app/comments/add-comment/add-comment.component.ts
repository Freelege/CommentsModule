import { Component, EventEmitter, ViewChild, Output, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../../@shared/auth.service';
import { User } from '@app/models/user.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {  
  @ViewChild('comment') commentRef!: ElementRef;

  @Input() data: any;

  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();  

  loggedInUser: User;
  readyToSend: boolean = false;
  placeHolder : string = "Add a comment";

  constructor(private auth: AuthService) {
    this.loggedInUser = auth.loggedInUser;    
   }

   ngOnInit() {
    if (this.data?.threadId) {
      this.placeHolder = 'Reply a comment';
    }
   }

  sendComment = () => {
    let content = this.commentRef.nativeElement.value;
    let comment: Comment = {
      id: 0,
      threadId: this.data?.threadId,
      replyingTo: this.data?.replyingTo,
      content: content,
      createdAt: new Date(),
      score: 0,
      user: this.loggedInUser,
      replies: undefined,
      isBeingReplied: false,
      beingRepliedInfo: undefined
    }
    this.updateEmitter.emit({ action: 'add', data: comment });

     //reset the text box after sending
    this.commentRef.nativeElement.value = ''; 
    this.readyToSend = false;
  }

  OnTextChanged = ($event) => {
    if (this.commentRef.nativeElement.value) {
      this.readyToSend = true;
    } else {
      this.readyToSend = false;
    }
  }
}
