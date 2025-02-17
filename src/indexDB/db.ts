let version = 1;

export enum EDeedType {
  light = "LIGHT",
  heavy = "HEAVY",
  mighty = "MIGHTY",
  special = "SPECIAL",
}

export type TDeed = {
  id: string;
  name: string;
  type: EDeedType;
  targetAndRange: string;
  description?: string;
  start?: string;
  base?: string;
  hit?: string;
  spark?: string;
};

export enum Stores {
  Deeds = "Deeds",
  Effects = "Effects",
  Creatures = "Creatures",
}

export enum DBS {
  Deeds = "Deeds",
  Effects = "Effects",
  Creatures = "Creatures",
}

export const initDB = (db: DBS, stores: Stores[]): Promise<boolean> => {
  return new Promise((resolve) => {
    const request: IDBOpenDBRequest = indexedDB.open(db);

    request.onupgradeneeded = () => {
      const db = request.result;
      stores.forEach((store) => {
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

export const addData = <T>(
  db: DBS,
  storeName: Stores,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(db, version);

    request.onsuccess = () => {
      // console.log("request.onsuccess - addData", data);
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
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

export const upsertData = <T>(
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

export const removeData = (db: DBS, storeName: Stores, id: string) => {
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

export const getData = <T>(db: DBS, storeName: Stores): Promise<T[]> => {
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
