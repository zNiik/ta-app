import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/core/authentication/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'nmo-header',
  templateUrl: './header.component.html',
  styles: [`
    .ant-layout-header {
      box-shadow: 0px 2px 5px 0px #e5e5e5;
      position: relative;
    }

    .container {
      text-align: right;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user!: User | null;

  constructor(private userSvc: UserService, private authSvc: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userSvc.getUser();
  }

  onLogout() {
    localStorage.removeItem('orderId');
    localStorage.removeItem('address');
    localStorage.removeItem('card'); 
    
    this.authSvc.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
