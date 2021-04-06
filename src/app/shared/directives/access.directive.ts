import { Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "src/app/core/authentication/user.service";
import { User } from "../interfaces/user.interface";

type Access = 'auth';

@Directive({
    selector: '[nmoAccess]'
})
export class AccessDirective implements OnInit, OnDestroy {
    currentUser: User | null = null;
    sub!: Subscription;
    access!: Access;

    constructor(
        private templateRef: TemplateRef<any>, 
        private vc: ViewContainerRef,
        private userSvc: UserService
    ) {}

    ngOnInit() {
        this.sub = this.userSvc.currentUser.subscribe(user => {
            this.currentUser = user;
            this.updateView();
        })
    }

    updateView() {
        if (this.access === 'auth' && this.currentUser) {
            this.vc.createEmbeddedView(this.templateRef);
        } else {
            this.vc.clear();
        }
    }

    @Input() set nmoAccess(type: Access) {
        this.access = type;
        this.updateView();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}