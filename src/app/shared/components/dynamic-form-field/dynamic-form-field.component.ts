import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from '../../models/question-base';

@Component({
    selector: 'app-dynamic-form-field',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './dynamic-form-field.component.html',
    styleUrl: './dynamic-form-field.component.scss'
})
export class DynamicFormFieldComponent {
  @Input() question!: QuestionBase<any>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
