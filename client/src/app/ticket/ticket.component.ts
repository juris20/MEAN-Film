import { Component, OnInit } from '@angular/core';
import { Ticket, User} from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tickets: Ticket[];
  user: User;
  constructor(private store: Store<Ticket>, private adminService: AdminService, private storeUser: Store<User>) {
    this.storeUser.select('userInfo').subscribe(u =>{
      this.user = u;
    });

    this.list();
    this.store.select('adminTicketReducer')
      .subscribe(l => {
        this.tickets = l;
      })
   }

  ngOnInit() {
    
  }


   //  danh sach
   list() {
    this.adminService.listTicket()
      .then(list => {
        this.store.dispatch({ type: 'INIT', tickets: list })
      })
      .catch(err => console.error(err));
  }


}
