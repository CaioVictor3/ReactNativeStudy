export interface Refeicao {
  id: string;
  nome: string;
  descricao: string;
  data: string;       // formato DD/MM/AAAA
  hora: string;       // formato HH:MM
  dentroODieta: boolean;
  criadoEm: string;   // ISO string
}
