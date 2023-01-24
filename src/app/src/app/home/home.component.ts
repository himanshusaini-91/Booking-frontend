import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/github/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchFormGroup: FormGroup;
  results: any = [];
  searchValue: any;
  constructor(public formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.searchFormGroup = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  getResults(searchValue: string) {
    let obj = {
      searchTerm: searchValue, 
      data: []
    }
    this.userService.getUsers(searchValue).then((resp: any) => {
      console.log(resp);
      if(resp.data && resp.data.items.length > 0) {
        obj.data = resp.data.items
        if(localStorage.getItem('userDetails')) {
          let arr: any = localStorage.getItem('userDetails');
          arr = JSON.parse(arr);
          console.log(arr);
          arr.push(obj);
          arr = arr.filter((value: any, index: number, self: any) =>
            index === self.findIndex((t: any) => (
              t.searchTerm === value.searchTerm
            ))
          )
          localStorage.setItem('userDetails', JSON.stringify(arr));
        } else {
          localStorage.setItem('userDetails', JSON.stringify([obj]));
        }
        this.results = resp.data.items
      }
      else {
        obj.data = [];
        localStorage.setItem('userDetails', JSON.stringify(obj));
      }
    })
    
  }

  clearHistory() {
    this.results = []
  }

}
