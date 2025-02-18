import { ReactElement, useState } from "react";
import { IndexDbContext } from "./indexDbContext";
import { DBS, Stores } from "./types";

let version = 2;

const initDB = (db: DBS, stores: Stores[]): Promise<boolean> => {
  return new Promise((resolve) => {
    const request: IDBOpenDBRequest = indexedDB.open(db, version);
    request.onupgradeneeded = () => {
      const db = request.result;
      stores.forEach((store) => {
        console.log(!db.objectStoreNames.contains(store));

        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = () => {
      const db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

const upsertData = <T,>(
  db: DBS,
  storeName: Stores,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(db, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

const removeData = (db: DBS, storeName: Stores, id: string) => {
  return new Promise((resolve) => {
    const request = indexedDB.open(db);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.delete(id);
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

const getData = <T,>(db: DBS, storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(db);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export default function IndexDBProvider(prop: { children: ReactElement }) {
  const [modified, setModified] = useState(0);

  function _initDB(db: DBS, stores: Stores[]) {
    return initDB(db, stores);
  }
  function _upsertData<T>(db: DBS, store: Stores, data: T) {
    return new Promise<string | null>((resolve) => {
      upsertData(db, store, data).then((value) => {
        setModified(modified + 1);
        resolve(value as string | null);
      });
    });
  }
  function _removeData(db: DBS, store: Stores, id: string) {
    return new Promise((resolve) => {
      removeData(db, store, id).then((value) => {
        setModified(modified + 1);
        resolve(value);
      });
    });
  }
  function _getData<T>(db: DBS, stores: Stores) {
    return getData<T>(db, stores) as Promise<T[]>;
  }

  return (
    <IndexDbContext.Provider
      value={{ modified, _initDB, _upsertData, _removeData, _getData }}
    >
      {prop.children}
    </IndexDbContext.Provider>
  );
}
