import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '@shared';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../comments.service';
import { AuthService } from '../../@shared/auth.service'

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  const authServiceStub = () => ({
    loggedInUser: {
      userId: 4,
      username: "yoda",
      status: "online",
      active: true
    }
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          HttpClientTestingModule
        ],
        declarations: [CommentComponent],
        providers: [
          CommentsService,
          { provide: AuthService, useFactory: authServiceStub }
        ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.value = {
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
