import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { DeedType } from './deedTypeEnum';

type TDeedCardProps = {
    name: string;
    type: DeedType;
    description: string;
    targetAndRange: string;
    base?: string;
    hit?: string;
    spark?: string;
};

export default function DeedCard(props: TDeedCardProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{props.name}</TableCell>
                        <TableCell align="right">{props.type}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.base && <TableRow>
                        <TableCell>{props.base}</TableCell>
                    </TableRow>}
                    {props.hit && <TableRow>
                        <TableCell>Hit</TableCell>
                        <TableCell>{props.hit}</TableCell>
                    </TableRow>}
                    {props.spark && <TableRow>
                        <TableCell>Spark</TableCell>
                        <TableCell>{props.spark}</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}