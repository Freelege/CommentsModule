import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  loadComments() {
    //Normally, the data should be retrieved from API. Here is just to simplify the challenge
    let data: Comment[] = [
      {
        id: 1,
        content: 'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You\'ve nailed the design and the responsiveness at various breakpoints works really well.',
        createdAt: new Date("2022-04-10T13:49:51.141Z"),
        score: 12,
        user: {
          userId: 1,
          username: "leiaskywalker",
          status: "offline",
          active: true
        },
        threadId: undefined,
        replyingTo: undefined,
        replies: undefined
      },
      {
        id: 2,
        content: 'Woah, your project looks awesome! How long have you been coding for? I\'m still new, but think I want to dive into Angular as well soon. Perhaps you can give me an insight on where I can learn Angular? Thanks!',
        createdAt: new Date("2022-05-14T13:49:51.141Z"),
        score: 5,
        user: {
          userId: 2,
          username: "lukeskywalker",
          status: "online",
          active: true
        },
        threadId: undefined,
        replyingTo: undefined,
        replies: [
          {
            id: 3,
            content: 'If you\'re looking to kick start your career, search no further. React is all you need. Welcome to the Dark Side.',
            createdAt: new Date("2022-06-01T13:49:51.141Z"),
            score: 4,
            user: {
              userId: 3,
              username: "vader",
              status: "online",
              active: true
            },
            threadId: 2,
            replyingTo: "lukeskywalker",
            replies: undefined
          },
          {
            id: 4,
            content: 'Chillax, my Padawans. Much to learn, you have. The fundamentals of HTML, CSS, and JS,  I\'d recommend focusing on. It\'s very tempting to jump ahead but lay a solid foundation first. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stays constant.',
            createdAt: new Date("2022-06-02T13:49:51.141Z"),
            score: 2,
            user: {
              userId: 4,
              username: "yoda",
              status: "online",
              active: true
            },
            threadId: 2,
            replyingTo: "vader",
            replies: undefined
          }
        ]
      }
    ];
        
    localStorage.setItem('comment-list', JSON.stringify(data));
    return data;
  }

  saveComments(commentList: Comment[]) {
    localStorage.setItem('comment-list', JSON.stringify(commentList));
    //To simplify the challenge, ignore the API call to save data (to DB, or file)
  }

  getNewCommentId(commentList: Comment[]) {
    let nextId = 0;
    commentList.forEach(x => {
      if (nextId < x.id) {
        nextId = x.id;
      }
      if (x.replies && x.replies.length > 0) {
        x.replies.forEach(y => {
          if (nextId < y.id) {
            nextId = y.id;
          }
        });
      }        
    });

    return ++nextId;
  }
}
