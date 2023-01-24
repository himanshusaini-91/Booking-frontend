import { Injectable } from '@angular/core';
import { Octokit } from "octokit";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { 

    
  }
  async getUsers(searchValue: string) {
    const octokit = new Octokit({
      auth: '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'
    })
    const data = await octokit.request(`GET /search/users`, {q:searchValue})
    return  data
  }
}
