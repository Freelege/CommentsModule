import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { CommentListComponent } from './comment-list/comment-list.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/comment-list', pathMatch: 'full' },
    { path: 'comment-list', component: CommentListComponent, data: { title: marker('Comment List') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CommentsRoutingModule { }
