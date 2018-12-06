import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ContactService } from '../contact.service';
declare var $: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  notLoggedIn;
  contactForm: FormGroup;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'message': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First Name is required',
      'minlength': 'First Name must be at least 2 characters long'
    }, 'lastName': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be at least 2 characters long'
    }, 'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    }, 'message': {
      'required': 'Message is required'
    }
  };

  constructor(private fb: FormBuilder, private contact: ContactService) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.contactForm.valueChanges.subscribe(data => { this.onValueChanged(data); });

  }

  ngOnInit() {
  }

  onValueChanged(data?: any) {
    if (!this.contactForm) { return; }

    const form = this.contactForm;
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitContact() {
    if (!this.contactForm.valid) {
      swal({ title: 'Please fill all the form fields' });
    } else {
      // console.log(this.contactForm.value);
      this.contactForm.reset();
      this.contact.submitContact(this.contactForm);
      // const email = this.user.email;
      // this.contact.submitContact(this.contactForm.value, email)
      //   .then(() => {
      //     this.contactForm.reset();
      //     swal({
      //       title: 'Thank you for contacting us',
      //     });
      //   })
      //   .catch(() => {
      //     swal({
      //       title: 'Please check your network'
      //     });
      //   });
    }
  }

}
