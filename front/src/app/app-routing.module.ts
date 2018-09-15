import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';
import { LoginComponent } from './components/login/login.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomComponent } from './components/room/room.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'room-list', component: RoomListComponent },
  { path: 'invite-friends', component: InviteFriendsComponent },
  { path: 'room/:roomId', component: RoomComponent },
  { path: 'transaction-create/:roomId', component: TransactionCreateComponent },
  { path: 'invitation', component: InvitationComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
