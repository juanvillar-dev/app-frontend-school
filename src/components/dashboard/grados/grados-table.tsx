'use client';
import * as React from 'react';
import {
  Box,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Button,
  Checkbox,
} from '@mui/material';
import Link from 'next/link';

interface Grado {
  id: number;
  nivel: string;
  year: number;
  materias: any[];
}

interface GradosTableProps {
  count?: number;
  page?: number;
  rows?: Grado[];
  rowsPerPage?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GradosTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
}: GradosTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '700px' }}>
          <TableHead>
            <TableRow>
              {/* COLUMNA DE CHECKBOX */}
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Materias</TableCell>
              {/* COLUMNA DE ACCIONES PEGADA A LA DERECHA */}
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.id}>
                {/* CHECKBOX POR FILA */}
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.nivel.toUpperCase()}
                    color={
                      row.nivel === 'inicial'
                        ? 'primary'
                        : row.nivel === 'primaria'
                        ? 'success'
                        : 'warning'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{row.year}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.materias.length} materias</Typography>
                </TableCell>
                {/* ACCIONES ALINEADAS A LA DERECHA */}
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      component={Link}
                      href={`/dashboard/grados/${row.id}`}
                      variant="outlined"
                      size="small"
                    >
                      👁 Ver
                    </Button>
                    <Button
                      component={Link}
                      href={`/dashboard/grados/${row.id}/editar`}
                      variant="contained"
                      size="small"
                      color="secondary"
                    >
                      ✏️ Editar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange!}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Card>
  );
}
