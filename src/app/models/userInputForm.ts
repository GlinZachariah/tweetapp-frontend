export class RegisterForm {
    firstName: string;
    lastName: string;
    userId: string;
    email: string;
    password: string;
    contactNumber: number;
}

export class LoginForm {
    userId: string;
    password: string;
}

export class TweetForm {
    userId: string;
    tweetMessage: string;
    timeStamp: string;
    likeCounter: number;
    tags: string[];
}

export class Reply {
    userId: string;
    timeStamp: string;
    comment: string;
}