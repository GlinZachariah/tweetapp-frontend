import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { TweetForm } from '../models/userInputForm';
import { IncomingResponse, TweetEntity } from '../models/incomingdata.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newtweet',
  templateUrl: './newtweet.component.html',
  styleUrls: ['./newtweet.component.css']
})
export class NewtweetComponent implements OnInit {
  tags: string[];
  tagsSize: number = 0;
  value: string;
  tweetLimit = true;
  tweeted = false;
  result = false;
  editTweet = false;
  currentTweet: TweetEntity;

  messageContent: string;


  constructor(private service: MainService, private route: ActivatedRoute, private router: Router) {
    this.tags = [];

  }

  ngOnInit(): void {
    let tweetId = this.route.snapshot?.params?.id != null ? this.route.snapshot.params.id : "";

    if (tweetId != null && this.service.selectedTweet != undefined && this.service.selectedTweet != null) {
      this.currentTweet = this.service.selectedTweet;
      this.editTweet = true;
      this.messageContent = this.currentTweet.tweetMessage;
      this.tags = this.currentTweet.tags;
    }
  }

  updateTweet(message: string) {
    let myTweet = new TweetForm();
    myTweet.userId = localStorage.getItem("tweetapp-loggeduser");
    myTweet.likeCounter = this.currentTweet.likeCounter;
    myTweet.timeStamp = this.currentTweet.timeStamp;
    myTweet.tweetMessage = message;
    myTweet.tags = this.tags;

    this.service.updateTweet(myTweet, this.currentTweet.tweetId).subscribe((res: IncomingResponse) => {
      if (res.code == 200) {
        this.tweeted = true;
        this.result = true;
        this.tags = [];
        this.messageContent = "";
        this.service.selectedTweet = null;
        this.editTweet = false;
        setTimeout(() => {
          this.router.navigate(['/tweets']);

        }, 1000)
      }
    })

  }

  tweet(message: string) {
    let myTweet = new TweetForm();
    myTweet.userId = localStorage.getItem("tweetapp-loggeduser");
    myTweet.timeStamp = new Date().toDateString();
    myTweet.likeCounter = 0;
    myTweet.tweetMessage = message;
    myTweet.tags = this.tags;
    this.service.addTweetForUser(myTweet).subscribe((res: IncomingResponse) => {
      if (res.code == 201) {
        this.tweeted = true;
        this.result = true;
        this.tags = [];
        this.messageContent = "";
      } else {
        this.tweeted = true;
        this.result = false;
      }
    });
  }


  addToList(value: string) {
    let content;
    if (value.indexOf(" ") == -1) {
      content = value;
    } else {
      content = value.split(" ")[0];
    }
    if (this.tagsSize + content.length <= 50) {
      this.tags.push(content);
      this.tagsSize = this.tagsSize + content.length;
    }

  }

  deleteTag(idx) {
    let elem = this.tags.splice(idx, 1);
    this.tagsSize = this.tagsSize - elem.length;
  }

  resetData() {
    this.tweeted = false;
    this.result = false;
  }

}
