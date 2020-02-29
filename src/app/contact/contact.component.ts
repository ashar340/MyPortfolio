import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {ValidationService} from './validation.service';
import {ContactService} from './contact.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Error} from 'tslint/lib/error';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formIsProcessing: boolean;
  data: object;
  status: number;
  contactForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private validationService: ValidationService, private contactService: ContactService) {
    this.createForm();
  }

  clearForm() {
    this.createForm();
  }

  getClass() {
    if (!this.contactForm.valid) {
      return 'disabled';
    }
  }

  createForm() {
    this.status = null;
    this.formIsProcessing = false;
    this.contactForm = this.formBuilder.group({
      'name': ['', Validators.compose([
        Validators.required,
        this.validationService.namevalidator
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        this.validationService.emailValidator
      ])],
      'message': ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  onSubmit(message: object) {
    if (this.contactForm.valid) {
      this.status=1;
    } else {
      console.log('form is invalid');
    }
  }

  handleError(err: Error) {
    console.log('An error occurred: ', err);
  }

  handleResponse(data) {
    this.data = data;
    this.status = data.status;
  }
}
