import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http: HttpClient) {

  }
  public url = environment.base_url + `seats`;

  getList() {
    return this.http.get(this.url + `/list`).pipe(map(response => response));
  }

  save(payload: any) {
    return this.http.post(this.url + `/booked`, payload).pipe(map(response => response));
  }

}
