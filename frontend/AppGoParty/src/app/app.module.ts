import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EventoComponent } from './eventos/evento/evento.component';
import { GeneroComponent } from './generos/genero/genero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventoNovoComponent } from './eventos/evento-novo/evento-novo.component';
import { GeneroNovoComponent } from './generos/genero-novo/genero-novo.component';
import { EventoDetalheComponent } from './eventos/evento-detalhe/evento-detalhe.component';
import { EventoEditarComponent } from './eventos/evento-editar/evento-editar.component';
import { GeneroEditarComponent } from './generos/genero-editar/genero-editar.component';
import { ExcelService } from './services/excel.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from "@angular/material/select";
import {MatNativeDateModule} from '@angular/material/core';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { GeneroDetalheComponent } from './generos/genero-detalhe/genero-detalhe.component';
import { EstabelecimentoComponent } from './estabelecimentos/estabelecimento/estabelecimento.component';
import { EstabelecimentoDetalheComponent } from './estabelecimentos/estabelecimento-detalhe/estabelecimento-detalhe.component';
import { EstabelecimentoEditarComponent } from './estabelecimentos/estabelecimento-editar/estabelecimento-editar.component';
import { EstabelecimentoNovoComponent } from './estabelecimentos/estabelecimento-novo/estabelecimento-novo.component';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
import { HomeDetalheComponent } from './home-detalhe/home-detalhe.component';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    EventoComponent,
    GeneroComponent,
    EstabelecimentoComponent,
    DashboardComponent,
    EventoNovoComponent,
    GeneroNovoComponent,
    EstabelecimentoNovoComponent,
    EventoDetalheComponent,
    GeneroDetalheComponent,
    EstabelecimentoDetalheComponent,
    EventoEditarComponent,
    GeneroEditarComponent,
    EstabelecimentoEditarComponent,
    RelatorioComponent,
    RegistrarComponent,
    LoginComponent,
    HomeDetalheComponent
  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,  
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule, 
    MatSelectModule,
    MatSidenavModule,  
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: 'ORIGIN_URL', useValue: location.origin }, ExcelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
