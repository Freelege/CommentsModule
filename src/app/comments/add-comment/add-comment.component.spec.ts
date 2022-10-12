import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '@shared';
import { AddCommentComponent } from './add-comment.component';
import { QuoteService } from '../quote.service';

describe('HomeComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          HttpClientTestingModule
        ],
        declarations: [AddCommentComponent],
        providers: [QuoteService]
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
