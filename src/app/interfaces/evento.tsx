import { Grupo } from "./grupo";
import { Local } from "./local";

export interface Evento {
  id: number;
  nome: string;
  descricao: string;
  grupo: Grupo;
  local: Local;
}
