import { Ator } from "./ator";
import { Classe } from "./classe";
import { Diretor } from "./diretor";

export interface Titulo {

  _id: string;
  name: string;
  atores: Ator[];
  diretor: Diretor;
  year: string;
  synopsis: string;
  category: string;
  classe: Classe;

}
