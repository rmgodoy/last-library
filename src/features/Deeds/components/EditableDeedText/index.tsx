import { TextField, Typography } from "@mui/material";

type TEditableTextProps = {
  isEditing: boolean;
  value: string;
  onValueChange: (newValue: string) => void;
};

// const weaponDamageExp = /<(\d+)WD>/g;

export default function EditableDeedText(props: TEditableTextProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    props.onValueChange(e.target.value);
  }

  function parseValue(value: string) {
    // const element = [];

    // const weaponDmgMatches = [...value.matchAll(weaponDamageExp)];
    // if (weaponDmgMatches && weaponDmgMatches.length) {
    //   weaponDmgMatches.forEach((match) => {
    //     element.push(
    //       <Typography>{value.slice(match.index, match[0].length)}</Typography>
    //     );
    //     console.log(value.split(value[match.index]));
    //   });
    // }
    // if (element.length == 0) {
    return <Typography>{value}</Typography>;
    // }
    // console.log(element);
    // return element;
  }

  return (
    <>
      {!props.isEditing ? (
        <>{parseValue(props.value)}</>
      ) : (
        <TextField
          fullWidth={true}
          value={props.value}
          onChange={onChange}
          variant="standard"
        ></TextField>
      )}
    </>
  );
}
