import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventoComponent } from './eventos/evento/evento.component';
import { EventoDetalheComponent } from './eventos/evento-detalhe/evento-detalhe.component';
import { EventoNovoComponent } from './eventos/evento-novo/evento-novo.component';
import { EventoEditarComponent } from './eventos/evento-editar/evento-editar.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { GeneroComponent } from './generos/genero/genero.component';
import { GeneroNovoComponent } from './generos/genero-novo/genero-novo.component';
import { GeneroEditarComponent } from './generos/genero-editar/genero-editar.component';
import { GeneroDetalheComponent } from './generos/genero-detalhe/genero-detalhe.component';
import { EstabelecimentoNovoComponent } from './estabelecimentos/estabelecimento-novo/estabelecimento-novo.component';
import { EstabelecimentoEditarComponent } from './estabelecimentos/estabelecimento-editar/estabelecimento-editar.component';
import { EstabelecimentoComponent } from './estabelecimentos/estabelecimento/estabelecimento.component';
import { EstabelecimentoDetalheComponent } from './estabelecimentos/estabelecimento-detalhe/estabelecimento-detalhe.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { HomeDetalheComponent } from './home-detalhe/home-detalhe.component';

const routes: Routes = [
  {path: 'dashboard', component: RelatorioComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'eventos', component: EventoComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'generos', component: GeneroComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'estabelecimentos', component: EstabelecimentoComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'relatorio', component: RelatorioComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'evento-detalhe/:id', component: EventoDetalheComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'genero-detalhe/:id', component: GeneroDetalheComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'evento-novo', component: EventoNovoComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'evento-editar/:id', component: EventoEditarComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'genero-novo', component: GeneroNovoComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'estabelecimento-novo', component: EstabelecimentoNovoComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'genero-editar/:id', component: GeneroEditarComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'estabelecimento-novo', component: EstabelecimentoNovoComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'estabelecimento-editar/:id', component: EstabelecimentoEditarComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'estabelecimento-detalhe/:id', component: EstabelecimentoDetalheComponent, canActivate: [UsuarioAutenticadoGuard]},
  {path: 'registrar', component: RegistrarComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  {path: 'home-detalhe/:id', component: HomeDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
