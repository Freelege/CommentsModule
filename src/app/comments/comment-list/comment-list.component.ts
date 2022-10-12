import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comment } from '../../models/comment.model';
import { CommentsService } from '../comments.service';
import { ConfirmationDeleteComponent } from '../../@shared/confirmation-delete/confirmation-delete.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @ViewChild('comments') commentListRef!: ElementRef;

  commentList: Comment[] = [];

  constructor( private commentsService: CommentsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
    this.commentList = this.sortCommentList(this.commentList);
  }

  loadData = () => {
    //    
    let listStr = localStorage.getItem('comment-list');
    if (listStr) {
      this.commentList = JSON.parse(listStr);
    } else {
      this.commentList = this.commentsService.loadComments();
    }
  }

  sortCommentList = (commentList: Comment[]) => {
    //order the comment list by score -- descending order
    let list = commentList.sort(function(a, b)
    {
      var x = a.score; var y = b.score;
      return ((x > y) ? -1 : ((x > y) ? 1 : 0));
    });

    //order the replies by created time -- ascending order
    list.forEach(comment => {
      if (comment.replies) {
        comment.replies = comment.replies.sort(function(a, b)
        {
          var x = a.createdAt; var y = b.createdAt;
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
    });
    return list;
  }

  performOperation = ($event: any) => {
    if ($event.action === 'update') {
      this.updateComment($event);
    } else if ($event.action === 'delete') {
      this.deleteComment($event);      
    } else if ($event.action === 'reply') {
      this.replyComment($event);
    } else if ($event.action === "add") {
      this.addComment($event);
    }

    this.commentsService.saveComments(this.commentList);
  }

  updateComment = ($event: any) => {
    if (!$event.data.threadId) { //it is a thread root        
      let index = this.commentList.findIndex(x => x.id === $event.data.id);  //get comment index
      if (index !== -1) {
        this.commentList[index] = $event.data;
      }
    } else { //it is a reply
      let threadIndex = this.commentList.findIndex(x => x.id === $event.data.threadId);
      if (threadIndex !== -1) {
        let replies = this.commentList[threadIndex].replies;
        if (replies) {
          let replyIndex = replies.findIndex(x => x.id === $event.data.id);
          if (replyIndex !== -1) {
            replies[replyIndex] = $event.data;
          }
        }     
      }
    }
  }

  deleteComment = ($event: any) => {
    this.commentListRef.nativeElement.setAttribute('style', 'pointer-events: none; opacity: 0.5');
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent, 
    {
      disableClose: true,
      data: {
        heading: "Delete Comment",
        body: "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
        confirmButtonText: "YES, DELETE",
        declineButtonText: "NO, CANCEL"
      }
    });        

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (!$event.data.threadId) { //it is a thread root        
          let index = this.commentList.findIndex(x => x.id === $event.data.id);  //get comment index
          if (index !== -1) {
            this.commentList.splice(index, 1);
          }
        } else { //it is a reply
          let threadIndex = this.commentList.findIndex(x => x.id === $event.data.threadId);
          if (threadIndex !== -1) {
            let replies = this.commentList[threadIndex].replies;
            if (replies) {
              let replyIndex = replies.findIndex(x => x.id === $event.data.id);
              if (replyIndex !== -1) {
                replies.splice(replyIndex, 1);
              }
            }     
          }
        }
      }

      this.commentListRef.nativeElement.setAttribute('style', 'pointer-events: all; opacity: 1');
    });
  }

  replyComment = ($event: any) => {
    const dialogRef = this.dialog.open(AddCommentComponent, 
    {
      data: {
        threadId: $event.data.threadId,
        replyingTo: $event.data.replyingTo
      }
    });       
    
    dialogRef.componentInstance.updateEmitter.subscribe(data => {
      this.performOperation(data);      
    });
  }

  addComment = ($event: any) => {
    //need a new comment id
    let nextCommentId = this.commentsService.getNewCommentId(this.commentList);
    $event.data.id = nextCommentId;

    if (!$event.data.threadId) { //new thread root     
      this.commentList.push($event.data); 
    } else {
      let index = this.commentList.findIndex(x => x.id === $event.data.threadId);
      if (index !== -1) {
        let threadRoot = this.commentList[index];
        if (threadRoot.replies) {
          threadRoot.replies.push($event.data);
        } else {
          threadRoot.replies = [$event.data];
        }
      }
    }
  }
}
