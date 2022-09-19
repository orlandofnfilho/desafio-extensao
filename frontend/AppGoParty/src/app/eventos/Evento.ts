export interface Evento {
    id: string;
    nome: string;
    atracao: string;
    data: string;
    generoId: string;
    estabelecimentoId: string;
    descricao: string;
    curtidas: number;
    urlImagem: string;
    urlIngresso: string;
    genero: {
      nome: string;
    },
    estabelecimento: {
      nome: string;
    }
  }