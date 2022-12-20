import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeatService }from 'src/app/services/seat/seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'booking-app';
  public bookingFormGroup: FormGroup;
  list:any = [];
  bookingList=[2,4,6,1];
  constructor(
    private _formBuilder: FormBuilder,
    private seatService: SeatService,
  ) {

  }

  ngOnInit() {
    this.bookingFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      noOfSeats: ['', Validators.required],
    });
    this.getList()
  }
  getList() {
    this.seatService.getList().subscribe(
      (res: any)=> {
        this.list = res;
        console.log('res', res);
      },(err: any) => {
        console.log('err', err);
      }
    )
  }

  booked() {
    if(this.validateForm()) {
      const seats = this.bookingFormGroup.controls['noOfSeats'].value.map((i: any) => i).reduce((a: number,b: number) => a+b);
      
      
      const payload = {
        userDetails: {
          name: this.bookingFormGroup.controls['name'].value,
          email: this.bookingFormGroup.controls['email'].value
        },
        requestedSeats: seats
      }
      this.seatService.save(payload).subscribe(
        (res: any)=> {
          this.getList();
        },(err: any) => {
          console.log('err', err);
        }
      )
    }
  }

  validateForm(): boolean{
    const name = this.bookingFormGroup.controls['name'];
    const email = this.bookingFormGroup.controls['email'];
    const noOfSeats = this.bookingFormGroup.controls['noOfSeats'];
    console.log('calling=============', name);
    let isValid = true
    if(!name.value) {
      console.log('inside');
      name.setErrors({require: true})
      isValid = false
    }
    if(!email.value) {
      email.setErrors({require: true})
      isValid = false
    }
    if(!noOfSeats.value.length) {
      noOfSeats.setErrors({require: true})
      isValid = false
    }
    return isValid

  }



}
