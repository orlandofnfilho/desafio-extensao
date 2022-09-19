import { Module } from '@nestjs/common';
import { GeneroModule } from './modules/genero/genero.module';
import { EstabelecimentoModule } from './modules/estabelecimento/estabelecimento.module';
import { EventoModule } from './modules/evento/evento.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { UsuarioeventoModule } from './modules/usuarioevento/usuarioevento.module';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth';

@Module({
  imports: [
    GeneroModule,
    EstabelecimentoModule,
    EventoModule,
    UsuarioModule,
    UsuarioeventoModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
