import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { signupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { MovieIndexComponent } from './movie-index/movie-index.component';
import { MoviesCreateComponent } from './movies-create/movies-create.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: signupComponent },
  {path:"customerDashboard",component:CustomerDashboardComponent},
  {path:"adminDashboard",component:AdminDashboardComponent},
  {path:"viewMovies",component:ViewMoviesComponent},
  {path:"viewProfile/:userid",component:ViewProfileComponent},
  {path:"editProfile/:userid",component:EditProfileComponent},
  {path:"userbookings/:userid",component:UserBookingsComponent},
  {path:"movieIndex",component:MovieIndexComponent},
  {path:"movieCreate",component:MoviesCreateComponent},
  {path:"allBookings",component:AllBookingsComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"aboutus",component:AboutusComponent},
  {path:"movieView/:movieId/view",component:MovieViewComponent},
  {path:"singleView/:movieId/view",component:SingleViewComponent},
  {path:"booking/:movieId/view",component:BookingComponent},
  {path:"payment/:totalCost",component:PaymentComponent},
  {path:"success",component:SuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
