import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
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
export class CommentListComponent implements OnInit, AfterViewInit {
  @ViewChild('comments') commentListRef!: ElementRef;

  commentList: Comment[] = [];

  reply: any;

  constructor( private commentsService: CommentsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
    this.commentList = this.sortCommentList(this.commentList);
  }

  ngAfterViewInit(): void {    
    this.commentListRef.nativeElement.scrollIntoView(true);  //Keep the initial view of the list on top
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
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent, 
    {
      disableClose: true,
      autoFocus: "false",  //stop the screen scrolling to the first focusable element on the page when opening the dialog     
      hasBackdrop: true,      
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
    });
  }

  replyComment = ($event: any) => {
    let index = this.commentList.findIndex(x => x.id === $event.data.threadId); //get which thread is being replied
    if (index !== -1) {
      this.commentList[index].isBeingReplied = true;
      this.commentList[index].beingRepliedInfo = {
        threadId: $event.data.threadId,
        replyingTo: $event.data.replyingTo
      }
    }
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
        threadRoot.isBeingReplied = false;
      }
    }
  }
}
