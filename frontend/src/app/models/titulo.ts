import { Ator } from "./ator";
import { Classe } from "./classe";
import { Diretor } from "./diretor";

export interface Titulo {

  _id: string;
  name: string;
  ator: Ator[];
  diretor: Diretor;
  year: string;
  sinopsys: string;
  category: string;
  classe: Classe;

}
