import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITasks} from './tasks.interface';


export class TasksDynamicForm {
  form = new FormGroup({}) as any;
  fb: FormBuilder = new FormBuilder();

  constructor(formModel: ITasks[]) {
    this.initializeForm(formModel);
  }

  initializeForm = (formModel: ITasks[]) => {
    formModel.map((data: any) => {
      const entries = Object.entries(data);
      entries.map(([key]) => {
        this.form.addControl(key, this.fb.control(data[key]));
        this.addValidator(key, [Validators.required]);
      });
    });
  }

  private addValidator = (name: string, ...[validator]: any) => {
    this.form.controls[name].addValidators(validator);
  }

  get controls() {
    return this.form.controls;
  }
}
