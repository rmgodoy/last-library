import { Button } from "@mui/material";
import { addData, DBS, EDeedType, Stores, TDeed } from "../../../../indexDB/db";
import { uuid } from "uuid";

type TDeedSearchBarProps = {};

const templateDeed: TDeed = {
  id: uuid.v4(),
  type: EDeedType.light,
  name: "Deed Title",
  targetAndRange: "MELEE ATTACK VS. GUARD | 2 CREATURES",
  base: "",
  hit: "",
  start: "",
  spark: "",
  description: "",
};

export default function DeedSearchBar(props: TDeedSearchBarProps) {
  function addDeed() {
    addData(DBS.Deeds, Stores.Deeds, { ...templateDeed });
  }
  return (
    <>
      <Button onClick={addDeed}>+</Button>
    </>
  );
}
