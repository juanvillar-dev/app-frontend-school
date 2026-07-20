'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection';
import { Button } from '@mui/material';
import Link from 'next/link';

export interface Alumno {
  id: number;
  fechaNacimiento: string;
  usuario: {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    genero: string;
  };
  grado: {
    id: number;
    nivel: string;
    year: number;
    materias: any[];
  };
  createdAt: string | null;
  updatedAt: string | null;
}

interface AlumnosTableProps {
  count?: number;
  page?: number;
  rows?: Alumno[];
  rowsPerPage?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AlumnosTable(
  {
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0,
    onPageChange,
    onRowsPerPageChange,
  }: AlumnosTableProps
): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((alumno) => alumno.id.toString()), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
  <TableRow>
    <TableCell padding="checkbox">
      <Checkbox
        checked={selectedAll}
        indeterminate={selectedSome}
        onChange={(event) => {
          if (event.target.checked) selectAll();
          else deselectAll();
        }}
      />
    </TableCell>
    <TableCell>Nombre</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>DNI</TableCell>
    <TableCell>Grado</TableCell>
    <TableCell>Fecha Nacimiento</TableCell>
    <TableCell>Acciones</TableCell>
  </TableRow>
</TableHead>

          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id.toString());
              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) selectOne(row.id.toString());
                        else deselectOne(row.id.toString());
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Avatar>{row.usuario.nombre.charAt(0)}</Avatar>
                      <Typography variant="subtitle2">
                        {row.usuario.nombre} {row.usuario.apellido}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.usuario.email}</TableCell>
                  <TableCell>{row.usuario.dni}</TableCell>
                  <TableCell>
                    {row.grado.nivel} ({row.grado.year})
                  </TableCell>
                  <TableCell>{dayjs(row.fechaNacimiento).format('DD/MM/YYYY')}</TableCell>
                  
                  {/* 👈 nueva celda para acciones */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        component={Link}
                        href={`/dashboard/alumnos/${row.id}`}
                        variant="outlined"
                        size="small"
                      >
                        👁 Ver
                      </Button>
                      <Button
                        component={Link}
                        href={`/dashboard/alumnos/${row.id}/editar`}
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        ✏️ Editar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
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
        rowsPerPageOptions={[10, 15, 20]}
      />
    </Card>
  );
}
