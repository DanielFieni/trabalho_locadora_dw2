import { Associate } from "./associate";

export interface Dependent {
  numInscription: string;
  name: string;
  dtBirth: string;
  sex: string;
  active: boolean;
  associate: Associate;
}
