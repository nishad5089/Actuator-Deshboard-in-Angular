import {MasterModel} from './master.model';
import {MasterService} from './master.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MasterComponent} from './master.component';

export abstract class MasterAddComponent<T extends MasterModel> extends MasterComponent<T> {

  constructor(protected service: MasterService<T>,
              protected dialog: MatDialog,
              protected snackbar: MatSnackBar) {
    super(service, dialog, snackbar);
  }

}
