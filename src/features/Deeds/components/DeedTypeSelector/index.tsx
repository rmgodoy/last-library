import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { EDeedType } from "../../../../indexDB/db";

type TDeedTypeSelectorProps = {
  type: EDeedType;
  isEditing: boolean;
  onChange: (value: EDeedType) => void;
};

export default function DeedTypeSelector(props: TDeedTypeSelectorProps) {
  const [deedType, setDeedType] = useState<EDeedType>(props.type);
  const handleChange = (event: SelectChangeEvent) => {
    const newType = event.target.value as EDeedType;
    setDeedType(newType);
    props.onChange(newType);
  };

  return (
    <>
      {props.isEditing ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deedType}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={EDeedType.light}>LIGHT</MenuItem>
          <MenuItem value={EDeedType.heavy}>HEAVY</MenuItem>
          <MenuItem value={EDeedType.mighty}>MIGHTY</MenuItem>
          <MenuItem value={EDeedType.special}>SPECIAL</MenuItem>
        </Select>
      ) : (
        <Typography>{props.type}</Typography>
      )}
    </>
  );
}
