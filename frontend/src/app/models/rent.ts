import { Client } from "./client";
import { Item } from "./item";

export interface Rent {
  _id: string;
  rentalDate: string;
  expectedReturnDate: string;
  returnDate: string;
  amountCharged: string;
  fineCharged: string;
  paid: boolean;
  client: Client;
  item: Item;
}
