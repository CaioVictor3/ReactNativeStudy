// Define os possíveis estados do orçamento no sistema.
// Usamos um "type union" para limitar os valores permitidos.
export enum StatusOrcamento {
    TODOS = 'Todos',
  RASCUNHO = 'Rascunho',
  ENVIADO = 'Enviado',
  APROVADO = 'Aprovado',
  RECUSADO = 'Recusado',

}