import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private location: Location,
    private _snackBar: MatSnackBar,
  ) { }

  onSuccess(msg: String) {
    this._snackBar.open(`${msg} cadastrado com sucesso`,'X', { duration: 4000});
    this.cancel()
  }

  cancel() {
    this.location.back();
  }

  onError(error: string, msg: String) {
    this._snackBar.open(`${msg}: ` + error, '', { duration: 4000 });
  }

  getErrorMessage(fieldName: string, form: FormGroup){
    const field = form.get(fieldName);
    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }
    return "Campo inválido";
  }

}
