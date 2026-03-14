import { StatusOrcamento } from './StatusOrcamento';

export enum FilterStatus {
    PENDING = 'Pending',
    DONE = 'done',
}

export type StatusFilter = StatusOrcamento | 'Todos';

