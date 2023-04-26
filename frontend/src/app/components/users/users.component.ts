import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../token/token-storage.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {

  readonly ROLE_ADMIN = environment.roleAdmin;
  readonly ROLE_USER = environment.roleUser;
  users: User[] = [];
  role: String = '';

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.setUsers();
    this.role = this.tokenStorageService.getUser().role;
  }

  setUsers(): void {
    this.userService.getUsers()
      .subscribe(u => this.users = u);
  }

  lockUser(id: number): void {
    this.userService.lockUser(id)
      .subscribe({
        next: () => this.ngOnInit(),
        error: (e) => console.error(e)
      })
  }

  unlockUser(id: number): void {
    this.userService.unlockUser(id)
      .subscribe({
        next: () => this.ngOnInit(),
        error: (e) => console.error(e)
      });
  }

}
