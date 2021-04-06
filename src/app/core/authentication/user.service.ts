import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { User } from "src/app/shared/interfaces/user.interface";

@Injectable()
export class UserService {
    private currentUser$ = new BehaviorSubject<User | null>(null);
    public currentUser = this.currentUser$.asObservable().pipe(distinctUntilChanged())

    setUser(user: User | null) {
        this.currentUser$.next(user);
    }

    getUser() {
       return this.currentUser$.value as User;
    }
}