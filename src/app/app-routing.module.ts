import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapPageComponent } from './map-page/map-page.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
 
  { 
    path: 'sign-in', 
    component: SignInComponent, 
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
  },
  { 
    path: 'home', 
    component: HomepageComponent, 
  },
  { 
    path: 'hail', 
    component: MapPageComponent, 
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
