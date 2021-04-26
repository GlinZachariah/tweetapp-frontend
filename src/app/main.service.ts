import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginForm, RegisterForm, Reply, TweetForm } from "./models/userInputForm";
import { BehaviorSubject } from 'rxjs';
import { TweetEntity } from './models/incomingdata.model';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private PREFIX_PATH: string = "api/api/v1.0/tweets/";
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selectedTweet: TweetEntity;

  constructor(private http: HttpClient) { }


  registerNewUser(data: RegisterForm) {
    return this.http.post(this.PREFIX_PATH + "register", data);
  }

  loginUser(data: LoginForm) {
    return this.http.post(this.PREFIX_PATH + "login", data);
  }

  resetUserPassword(data: LoginForm) {
    return this.http.post(this.PREFIX_PATH + data.userId + "/forgot", data);
  }


  getAllTweets() {
    return this.http.get(this.PREFIX_PATH + "all");
  }

  getAllUsers() {
    return this.http.get(this.PREFIX_PATH + "users/all");
  }

  searchByUsername(user: string) {
    return this.http.get(this.PREFIX_PATH + "user/search/" + user);
  }

  addTweetForUser(data: TweetForm) {
    return this.http.post(this.PREFIX_PATH + data.userId + "/add", data);
  }

  likeTweet(userId: string, id: number) {
    return this.http.put(this.PREFIX_PATH + userId + "/like/" + id, {});
  }

  replyTweet(data: Reply, id: number) {
    return this.http.put(this.PREFIX_PATH + data.userId + "/reply/" + id, data);
  }

  updateTweet(data: TweetForm, id: number) {
    return this.http.put(this.PREFIX_PATH + data.userId + "/update/" + id, data);
  }

  deleteTweet(userId: string, id: number) {
    return this.http.delete(this.PREFIX_PATH + userId + "/delete/" + id);

  }




}
