import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  dynamicForm!: FormGroup;
  formConfig: any;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.fetchFormConfig().then((config) => {
      this.formConfig = config;
      this.buildForm(config.fields);
    })
  }

  async fetchFormConfig() {
    return {
      fields: [
        { label: "Username", type: "text", required: true },
        { label: "Age", type: "number", required: false },
        {
          label: "Gender",
          type: "select",
          options: ["Male", "Female"],
          required: true,
        },
      ],
    };
  }

  buildForm(fields: any[]) {
    const controls: any = {};
    fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      controls[field.label] = ["", validators];
    });
    this.dynamicForm = this.fb.group(controls);
  }

  submitForm() {
    console.log(this.dynamicForm.value);
  }
}
