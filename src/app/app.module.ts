import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AuthService } from './service/auth.service';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CountDownComponent } from './count-down/count-down.component';

@NgModule({
  declarations: [
    AppComponent,
    CountDownComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AngularFirestore,
    {provide: BUCKET, useValue: 'walkamoles-e8bbd.appspot.com'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
