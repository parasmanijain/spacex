import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlsComponent } from './components/controls/controls.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LaunchDetailComponent } from './components/launch-detail/launch-detail.component';
import { CardComponent } from './components/card/card.component';
import { LaunchLandingControlsComponent } from './components/launch-landing-controls/launch-landing-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ControlsComponent,
    HeaderComponent,
    FooterComponent,
    LaunchDetailComponent,
    CardComponent,
    LaunchLandingControlsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
