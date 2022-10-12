import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '@shared';
import { CommentListComponent } from './comment-list.component';
import { QuoteService } from '../quote.service';

describe('HomeComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          HttpClientTestingModule
        ],
        declarations: [CommentListComponent],
        providers: [QuoteService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
