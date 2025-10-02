import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Associate } from '../../_shared/associate';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { associateModel } from '../../../model/associate';

@Component({
  selector: 'app-add',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss'
})
export class Add implements OnInit, OnDestroy {

  _form!: FormGroup;
  dialogdata: any;
  title = 'Adicionar Usuário';
  isadd = true;
  editdata!: associateModel;

  constructor(private service: Associate, private builder: FormBuilder, private ref: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    if (this.dialogdata.id > 0) {
      this.title = 'Editar Usuário';
      this.isadd = false;
      this.service.Get(this.dialogdata.id).subscribe(item => {
        this.editdata = item;
        this._form.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          address: this.editdata.address,
          cl: this.editdata.creditlimit,
          status: this.editdata.status
        });
      })
    }
    this._form = this.builder.group({
      id: this.builder.control({ disabled: true, value: 0 }),
      name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
      address: this.builder.control('', Validators.required),
      cl: this.builder.control(0, Validators.required),
      status: this.builder.control(true),

    })

  }
  ngOnDestroy(): void {

  }

  close() {
    this.ref.close();
  }

  save() {
    if (this._form.valid) {
      this.service.Getall().subscribe(lista => {
        const maxId = lista.length > 0 ? Math.max(...lista.map(item => item.id ?? 0)) : 0;
        let _data = {
          id: String(maxId + 1),
          name: this._form.value.name as string,
          address: this._form.value.address as string,
          creditlimit: Number(this._form.value.cl),
          status: Boolean(this._form.value.status)
        };
        if (this.isadd) {
          this.service.Create(_data).subscribe(item => {
            alert('Salvo com sucesso.');
            this.close();
          });
        }else{
          _data.id=this._form.getRawValue().id;
          this.service.Update(_data).subscribe(item => {
            alert('Alterado com sucesso.');
            this.close();
          });
        }

      });

    }
  }

}
