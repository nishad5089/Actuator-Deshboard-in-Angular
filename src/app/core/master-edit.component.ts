import {MasterModel} from './master.model';
import {MasterService} from './master.service';
import {MasterListComponent} from './master-list.component';
import {MatDialog, MatSnackBar} from '@angular/material';

export abstract class MasterEditComponent<T extends MasterModel> extends MasterListComponent<T> {

  constructor(protected service: MasterService<T>,
              protected dialog: MatDialog,
              protected snackbar: MatSnackBar) {
    super(service, dialog, snackbar);
  }

}
