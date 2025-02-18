import { Button, Input } from "@mui/material";
import { DBS, EDeedType, Stores, TDeed } from "../../../../indexDB/types";
import { v4 } from "uuid";
import { useContext, useRef } from "react";
import { IndexDbContext } from "../../../../indexDB/indexDbContext";
import { saveAs } from "file-saver";

const getTemplateDeed: () => TDeed = () => ({
  id: v4(),
  type: EDeedType.light,
  name: "Deed Title",
  targetAndRange: "MELEE ATTACK VS. GUARD | 2 CREATURES",
  base: "",
  hit: "",
  start: "",
  spark: "",
  description: "",
});

export default function DeedSearchBar() {
  const db = useContext(IndexDbContext);
  const importRef = useRef<HTMLInputElement>(undefined);
  const exportRef = useRef<HTMLInputElement>(undefined);
  function addDeed() {
    if (db._upsertData) {
      db._upsertData<TDeed>(DBS.Deeds, Stores.Deeds, { ...getTemplateDeed() });
    }
  }

  function onImport() {
    (importRef.current?.children[0] as HTMLInputElement).click();
  }

  function onImportFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) {
      console.warn("No files selected");
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const data: TDeed[] = JSON.parse(reader.result as string);
      for (const deed of data) {
        if (db._upsertData) {
          db._upsertData(DBS.Deeds, Stores.Deeds, deed);
        }
      }
    };
    reader.readAsText(file);
  }

  function onExport() {
    if (db._getData) {
      db._getData(DBS.Deeds, Stores.Deeds).then((data) => {
        saveAs(new Blob([JSON.stringify(data, null, 4)]), "deeds.json");
      });
    }
  }

  return (
    <>
      <Button onClick={addDeed}>+</Button>
      <Button onClick={onImport}>Import</Button>
      <Input
        ref={importRef}
        id="import"
        type="file"
        onChange={onImportFileSelected}
        sx={{ display: "none" }}
      ></Input>
      <Input
        ref={exportRef}
        id="export"
        type="file"
        onChange={onImportFileSelected}
        sx={{ display: "none" }}
      ></Input>
      <Button onClick={onExport}>Export</Button>
    </>
  );
}
