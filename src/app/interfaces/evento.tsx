import { Grupo } from "./grupo";
import { Local } from "./local";

export interface Evento {
  id: number;
  descricao: string;
  grupo: Grupo;
  local: Local;
}
