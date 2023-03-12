import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapPageComponent } from './map-page/map-page.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
 
  { 
    path: 'sign-in', 
    component: SignInComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'sign-up', 
    component: SignUpComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'register/:uid', 
    component: RegisterComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'home/:uid', 
    component: HomepageComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'hail/:uid', 
    component: MapPageComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent, 
    pathMatch: 'full' 
  },
  { 
    path: '', 
    redirectTo: 'sign-in',
    pathMatch: 'full' 
    
  },
  { 
    path: '**', 
    redirectTo:'sign-in',
    pathMatch: 'full' 
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
