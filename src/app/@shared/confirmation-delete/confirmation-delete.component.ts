import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-delete',
    templateUrl: './confirmation-delete.component.html',
    styleUrls: ['./confirmation-delete.component.scss'],
})
export class ConfirmationDeleteComponent {
    modalHeading: string | '' = '';

    confirmData;

    confirmButton = 'Delete';

    declineButton = 'Cancel';

    result = {
        yes: true,
        no: false
    };

    constructor(@Optional() public dialogRef: MatDialogRef<ConfirmationDeleteComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
        if (typeof data === 'object') {
            if (data.heading) {
                this.modalHeading = data.heading;
            }

            if (data.body) {
                this.confirmData = data.body;
            }

            if (data.confirmButtonText) {
                this.confirmButton = data.confirmButtonText;
            }

            if (data.declineButtonText) {
                this.declineButton = data.declineButtonText;
            }
        } else {
            this.confirmData = data;
        }
    }
}
