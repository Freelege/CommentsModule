import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '@shared';
import { AddCommentComponent } from './add-comment.component';
import { CommentsService } from '../comments.service';
import { AuthService } from '../../@shared/auth.service';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

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
        declarations: [AddCommentComponent],
        providers: [
          CommentsService,
          { provide: AuthService, useFactory: authServiceStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
