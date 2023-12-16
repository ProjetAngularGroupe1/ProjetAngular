import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            if (this.route.snapshot.routeConfig?.path === 'logout') {
                this.logOut();
            }
        });
    }

    logOut(): void {
        this.userService.logOut()
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 5000);
    }
}
