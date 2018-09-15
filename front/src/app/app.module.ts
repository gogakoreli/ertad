import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';
import { LoginComponent } from './components/login/login.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomComponent } from './components/room/room.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginGuard } from './guards/login.guard';
import { UserService } from './services/user.service';
import { SharedModule } from './shared/shared.module';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DashboardComponent,
    RoomListComponent,
    InviteFriendsComponent,
    RoomComponent,
    TransactionCreateComponent,
    InvitationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [UserService, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
