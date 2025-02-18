import { DBS, Stores } from "./types";
import { createContext } from "react";

type TDBContext = {
  modified: number;
  _initDB: undefined | ((db: DBS, stores: Stores[]) => Promise<boolean>);
  _upsertData:
    | undefined
    | (<T>(db: DBS, store: Stores, data: T) => Promise<string | null>);
  _removeData:
    | undefined
    | ((db: DBS, store: Stores, id: string) => Promise<unknown>);
  _getData: undefined | (<T>(db: DBS, stores: Stores) => Promise<T[]>);
};

export const IndexDbContext = createContext<TDBContext>({
  modified: 0,
  _initDB: undefined,
  _upsertData: undefined,
  _removeData: undefined,
  _getData: undefined,
});
