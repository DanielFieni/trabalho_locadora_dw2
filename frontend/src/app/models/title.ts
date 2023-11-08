import { Actor } from "./actor";
import { Class } from "./class";
import { Director } from "./director";

export interface Title {

  _id: string;
  name: string;
  actors: Actor[];
  director: Director;
  year: string;
  synopsis: string;
  category: string;
  aclass: Class;

}
