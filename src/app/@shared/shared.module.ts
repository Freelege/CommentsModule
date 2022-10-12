import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material-module';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmationDeleteComponent } from './confirmation-delete/confirmation-delete.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    MaterialModule
  ],
  providers: [
    AuthService
  ],

  declarations: [
    LoaderComponent,
    ConfirmationDeleteComponent
  ],
  exports: [
    MaterialModule,
    LoaderComponent,
    ConfirmationDeleteComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ConfirmationDeleteComponent
  ]
})
export class SharedModule { }
