import { Component, EventEmitter, ViewChild, Input, Output, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteComponent } from '../../@shared/confirmation-delete/confirmation-delete.component';
import { AuthService } from '../../@shared/auth.service';
import { User } from '@app/models/user.model';
import { Comment } from '../../models/comment.model';
import moment from 'moment';

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

  dateInfo: string = '';

  replyingTo: string | undefined = '';

  constructor(private auth: AuthService, private dialog: MatDialog) {
    this.loggedInUser = auth.loggedInUser;
   }

  ngOnInit() {    
    this.dateInfo = this.getDateInfo(this.value.createdAt); 
    this.replyingTo = this.value.replyingTo + ' ';
  }

  getDateInfo = (date: Date): string => {
    let now = moment(new Date());
    let commentDate = moment(date);
    let duration = moment.duration(now.diff(commentDate));
    let months = Math.floor(duration.asMonths());

    if (months > 0) {
      return months == 1 ? "1 month ago" : months + "months ago";
    } else {
      let days = Math.floor(duration.asDays());
      if (days > 0) {
        return days == 1 ? "1 day ago" : days + "days ago";
      } else {
        let hours = Math.floor(duration.asHours());
        if (hours > 0) {
          return hours == 1 ? "1 hour ago": hours + "hours ago";
        } else {
          return commentDate.format('HH:mm:ss');
        }
      }
    }
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
    this.updateEmitter.emit({ 
      action: 'reply', 
      data: {
        threadId: this.value.threadId ? this.value.threadId : this.value.id,
        replyingTo: this.value.user.username
      }});
  }
}
