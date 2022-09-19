import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/database/PrismaService';
import { UsuarioService } from '../src/modules/usuario/usuario.service';

const prisma = new PrismaClient();
const usuarioService = new UsuarioService(new PrismaService());

async function main() {
  await prisma.usuario.deleteMany({});
  await prisma.evento.deleteMany({});
  await prisma.genero.deleteMany({});
  await prisma.estabelecimento.deleteMany({});

  // Usuários
  await usuarioService.create({
    nome: 'Admin',
    email: 'admin@gft.com',
    senha: 'Gft@1234',
  });
  await usuarioService.create({
    nome: 'Usuário',
    email: 'usuario@gft.com',
    senha: 'Gft@1234',
  });

  const admin = await usuarioService.findByEmail('admin@gft.com');
  await usuarioService.updateRole(admin.id, '2');

  //Gêneros
  await prisma.genero.createMany({
    data: [
      { nome: 'Rock' },
      { nome: 'Pop' },
      { nome: 'Sertanejo' },
      { nome: 'Pagode' },
      { nome: 'Samba' },
      { nome: 'Blues' },
      { nome: 'Eletrônica' },
    ],
  });

  await prisma.estabelecimento.createMany({
    data: [
      {
        nome: 'Chevrolet hall',
        urlLoc: 'https://goo.gl/maps/k482bQZPthfuLFvN9',
      },
      {
        nome: 'AABB - Salvador',
        urlLoc: 'https://goo.gl/maps/bQWFV873DtW4TnbTA',
      },
      {
        nome: 'Tokyo SP',
        urlLoc: 'https://goo.gl/maps/FX7L3GYcH6RC2C6p6',
      },
      {
        nome: 'Bourbon Street Music Club',
        urlLoc: 'https://g.page/bourbonstreetmusicclub?share',
      },
      {
        nome: 'Espaço Hall',
        urlLoc: 'https://g.page/espacohall?share',
      },
      {
        nome: 'Sambódromo do Anhembi',
        urlLoc: 'https://goo.gl/maps/jkwqjyy2NZXPKBHP9',
      },
      {
        nome: 'OpenBar Club',
        urlLoc: 'https://goo.gl/maps/2T2u6YUCSeZSSiPX8',
      },
      {
        nome: 'Ferra Jockey',
        urlLoc: 'https://g.page/ferra-jockey-sp?share',
      },
    ],
  });

  const generoRock = await prisma.genero.findUnique({
    where: {
      nome: 'Rock',
    },
  });

  const generoSamba = await prisma.genero.findUnique({
    where: {
      nome: 'Samba',
    },
  });

  const generoBlues = await prisma.genero.findUnique({
    where: {
      nome: 'Blues',
    },
  });

  const generoEletronica = await prisma.genero.findUnique({
    where: {
      nome: 'Eletrônica',
    },
  });

  const generoSertanejo = await prisma.genero.findUnique({
    where: {
      nome: 'Sertanejo',
    },
  });

  const estabelecimentoFerraClub = await prisma.estabelecimento.findUnique({
    where: {
      nome: 'Ferra Jockey',
    },
  });

  const estabelecimentoOpenBarClub = await prisma.estabelecimento.findUnique({
    where: {
      nome: 'OpenBar Club',
    },
  });

  const estabelecimentoBourbonStreet = await prisma.estabelecimento.findUnique({
    where: {
      nome: 'Bourbon Street Music Club',
    },
  });

  const estabelecimentoSA = await prisma.estabelecimento.findUnique({
    where: {
      nome: 'Sambódromo do Anhembi',
    },
  });

  const estabelecimentoAABB = await prisma.estabelecimento.findUnique({
    where: {
      nome: 'AABB - Salvador',
    },
  });

  const estabelecimentoTokyoSP = await prisma.estabelecimento.findUnique({
    where: {
      nome: 'Tokyo SP',
    },
  });

  // Eventos
  await prisma.evento.createMany({
    data: [
      {
        nome: 'KnotFest 2022 - Brasil',
        atracao: 'SlipKnot',
        data: new Date(2022, 10, 5, 18, 45, 0, 0),
        descricao:
          'Knotfest é um festival de música criado pela banda de metal americana Slipknot. Sua primeira edição aconteceu em 17 de agosto de 2012, em Council Bluffs, Iowa e 18 de agosto de 2012, em Somerset, Wisconsin. Sua segunda edição ocorrerá em San Bernardino, Califórnia, nos dias 25 e 26 de outubro de 2014',
        urlImagem:
          'https://upload.wikimedia.org/wikipedia/pt/c/c8/Horns_Up_Rocks_Knotfest_Tour_Poster.jpg',
        urlIngresso:
          'https://www.eventim.com.br/event/knotfest-2022-sambodromo-do-anhembi-13338105/',
        generoId: generoRock.id,
        estabelecimentoId: estabelecimentoSA.id,
      },
      {
        nome: 'Rock Real Cover Festival Salvador',
        atracao: 'Cover Iron Maden',
        data: new Date(2022, 12, 3, 17, 45, 0, 0),
        descricao:
          'Música boa, gastronomia e bebidas de qualidade. Reunião de artistas renomados que reviverão shows históricos de grandes nomes do rock clássico e do pop rock nacional e internacional. ',
        urlImagem:
          'https://i0.wp.com/www.bahiarock.com.br/wp-content/uploads/2022/07/rock-real-cover-festival.jpg?w=640&ssl=1',
        urlIngresso:
          'https://www.sympla.com.br/evento/rock-real-cover-festival-salvador/1648222?fbclid=IwAR0kGrX-jZp2IZwVk0A3vHx5a0Uoijm-D7vW18Ul36Cd2sf-dfq6Q54devQ',
        generoId: generoRock.id,
        estabelecimentoId: estabelecimentoAABB.id,
      },
      {
        nome: 'SAMBA DO SOL * LISTA VIP TOKYO |18.09|',
        atracao: 'Roda de Samba  +. DJS CONVIDA@S',
        data: new Date(2022, 9, 21, 12, 45, 0, 0),
        descricao:
          'Samba do Sol volta pra Tokyo. O prédio mais inusitado para uma edição especial com DJs e Roda de Samba!',
        urlImagem: 'https://images.sympla.com.br/62e831c99e6dd-xs.jpg',
        urlIngresso:
          'https://www.sympla.com.br/evento/samba-do-sol-lista-vip-tokyo-18-09/1388157',
        generoId: generoSamba.id,
        estabelecimentoId: estabelecimentoTokyoSP.id,
      },
      {
        nome: 'Blues Beatles',
        atracao: 'Blues Beatles',
        data: new Date(2022, 9, 16, 9, 45, 0, 0),
        descricao:
          'Blues Beatles é atualmente a banda de blues brasileira mais relevante do mercado nacional e a sensação do mercado internacional:  apenas 3 anos de formação e um Cd lançado, 4 vídeos com quase 20 milhões de views, uma bem sucedida tour nos EUA em novembro de 2017 e mais tours em 2018 pela Europa: Dinamarca em março, França em julho e EUA novamente em junho e setembro. ',
        urlImagem:
          'https://www.baressp.com.br/eventos/fotos2/blues-beatles-sesc-santo-andre-baressp-min.jpg',
        urlIngresso:
          'https://bileto.sympla.com.br/event/63141/d/154919/s/1030817',
        generoId: generoBlues.id,
        estabelecimentoId: estabelecimentoBourbonStreet.id,
      },
      {
        nome: 'Gambiarra de Domingo',
        atracao: 'Miro RIZZO',
        data: new Date(2022, 9, 18, 9, 20, 0, 0),
        descricao:
          'A Gambiarra aos domingos foi criada há 14 anos para reunir artistas e profissionais do teatro para celebrar A festa deu tão certo que passou a agregar um público irreverente e descolado para promover a liberdade de expressão e a atitude de viver com alegria e diversão sem preconceitos. A festa valoriza a música brasileira e acontece todos os domingos, atualmente na Open Bar Club (Pinheiros - SP).',
        urlImagem: 'https://images.sympla.com.br/6304fc618ef9f-xs.jpg',
        urlIngresso:
          'https://www.sympla.com.br/evento/gambiarra-de-domingo-no-open-bar-club-11-09-2022/1692283?lang=PT',
        generoId: generoEletronica.id,
        estabelecimentoId: estabelecimentoOpenBarClub.id,
      },
      {
        nome: 'SERTANEJADA',
        atracao: 'Gustavo Lima',
        data: new Date(2022, 9, 30, 20, 0, 0, 0),
        descricao:
          'Dia 30/9 temos um encontro marcado com a música Sertaneja. Sertanejada 11 a festa Sertaneja mais Urbana do Brasil.',
        urlImagem:
          'https://pbs.twimg.com/profile_images/1365465890138054656/9GKDc0oQ_400x400.jpg',
        urlIngresso: 'https://www.sympla.com.br/evento/sertanejada/1706517',
        generoId: generoSertanejo.id,
        estabelecimentoId: estabelecimentoFerraClub.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
