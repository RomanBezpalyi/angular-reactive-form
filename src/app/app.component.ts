import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitted: boolean = false;
  user = {
    firstName: "",
    lastName: "",
    patronymicName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      patronymicName: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordData: new FormGroup({
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
        ]),
        passwordConfirmation: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          this.passwordsMatch.bind(this),
        ]),
      }),
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    for (let key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        if (this.signupForm.get(key)) {
          this.user[key] = this.signupForm.get(key).value;
        } else if (this.signupForm.get(`passwordData.${key}`)) {
          this.user[key] = this.signupForm.get(`passwordData.${key}`).value
        }
      }
    }

    this.signupForm.reset();
  }

  passwordsMatch(control: FormControl): { [k: string]: boolean } {
    if (this.signupForm) {
      const password = this.signupForm.get("passwordData.password").value;
      return password !== control.value
        ? { isPasswordNotConfirmed: true }
        : null;
    }
  }
}
