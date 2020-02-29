import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactComponent } from './contact.component';
import {FormBuilder, FormControl} from '@angular/forms';
import {ValidationService} from './validation.service';
import {ContactService} from './contact.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';


describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let validationService: ValidationService;
  let service: ContactService;
  let name, email, message;

  beforeEach(async(() => {
    // Get services
    service = new ContactService(null);
    validationService = new ValidationService();

    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: ValidationService, useValue: validationService },
        { provide: ContactService, useValue: service }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ContactComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  beforeEach(() => {

    // Get contact form controls
    name = component.contactForm.get('name');
    email = component.contactForm.get('email');
    message = component.contactForm.get('message');
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form', () => {

    it('should contain \'name\' control', () => {
      expect(component.contactForm.contains('name')).toBeTruthy();
    });
    it('should contain \'email\' control', () => {
      expect(component.contactForm.contains('email')).toBeTruthy();
    });
    it('should contain \'message\' control', () => {
      expect(component.contactForm.contains('email')).toBeTruthy();
    });

    it('should be invalid when controls have no value', () => {

      // Set form control values
      name.setValue('');
      email.setValue('');
      message.setValue('');

      expect(component.contactForm.valid).toBeFalsy();
    });

    it('should be valid when controls have value', () => {

      // Set form control values
      name.setValue('placeholder');
      email.setValue('placeholder@placeholder.com');
      message.setValue('placeholder');

      expect(component.contactForm.valid).toBeTruthy();
    });

    it('should make input controls required', () => {

      // Set form control values
      name.setValue('');
      email.setValue('');
      message.setValue('');

      expect(name.valid).toBeFalsy();
      expect(email.valid).toBeFalsy();
      expect(message.valid).toBeFalsy();
    });

    it('should make email control invalid by wrong not matching regex', () => {
      spyOn(validationService, 'emailValidator').and.callFake((control) => {
        if (!control.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          return {invalidEmail: true};
        }
      });

      // Set form control values
      email.setValue('dgdgdfg');

      expect(email.valid).toBeFalsy();
    });

    it('should make name control invalid by not matching regex', () => {
      spyOn(validationService, 'emailValidator').and.callFake((control) => {
        if (control.value.match(/[0-9]/)) {
          return {invalidName: true};
        }
      });

      // Set form control values
      name.setValue('8');

      expect(name.valid).toBeFalsy();
    });
  });

  describe('onSubmit', () => {

    const dummyMessage = {
      name: 'message obj name',
      email: 'message@obj.email',
      message: 'message obj message'
    };

    it('should call onSubmit() with message object', () => {
      const spy = spyOn(component, 'onSubmit').and.returnValue(Observable.empty());

      component.onSubmit(dummyMessage);
      expect(spy).toHaveBeenCalledWith(dummyMessage);
    });

    it('should call sendEmail method on ContactService with param', () => {
      const spy = spyOn(service, 'sendEmail').and.returnValue(Observable.empty());

      // Set form control values
      name.setValue('placeholder');
      email.setValue('placeholder@placeholder.com');
      message.setValue('placeholder');

      component.onSubmit(dummyMessage);
      expect(spy).toHaveBeenCalledWith(dummyMessage);
    });

    it('should set \'status\' value', () => {
      spyOn(service, 'sendEmail').and.returnValue(Observable.from([{status: 200}]));

      // Set form control values
      name.setValue('placeholder');
      email.setValue('placeholder@placeholder.com');
      message.setValue('placeholder');

      component.onSubmit({});
      expect(component.status).toEqual(200);
    });
  });
});
