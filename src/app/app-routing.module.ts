import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapPageComponent } from './map-page/map-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
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
    pathMatch: 'full' ,
    canActivate: [AuthGuard]
  },
  { 
    path: 'home/:uid', 
    component: HomepageComponent, 
    pathMatch: 'full' ,
    canActivate: [AuthGuard]
  },
  { 
    path: 'map/:uid', 
    component: MapPageComponent, 
    pathMatch: 'full' ,
    canActivate: [AuthGuard]
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
