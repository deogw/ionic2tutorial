import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GithubUsers} from '../../providers/github-users/github-users.ts';
import {User} from "../../models/user.ts";
import {UserDetailsPage} from "../user-details/user-details.ts";

/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',

  providers: [GithubUsers]
})
export class UsersPage {
  users: User[];

  constructor(private nav: NavController, private githubUsers: GithubUsers) {
    githubUsers
    .load()
    .then(users => this.users = users);
  }

  goToDetails(event, login) {
    this.nav.push(UserDetailsPage, {
      login: login
    });
  }

  search(searchTerm) {
    let term = searchTerm.target.value;

    if(term.trim().length < 3) {
      this.githubUsers
        .load()
        .then(users => this.users = users)
    } else {
      this.githubUsers.searchUsers(term)
        .then(users => this.users = users)
    }
  }
}
