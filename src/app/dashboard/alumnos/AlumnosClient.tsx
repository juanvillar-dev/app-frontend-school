'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { Alumno, AlumnosTable } from '@/components/dashboard/alumnos/alumnos-table';
import { AlumnosFilters } from '@/components/dashboard/alumnos/alumnos-filters';


export function AlumnosClient(): React.JSX.Element {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 estados para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:8080/alumnos')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAlumnos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando alumnos:', err);
        setLoading(false);
      });
  }, []);

  const paginatedAlumnos = applyPagination(alumnos, page, rowsPerPage);




  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Alumnos</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Importar
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Exportar
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button
            component={Link}
            href="/dashboard/alumnos/nuevo"
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Añadir
          </Button>
        </div>
      </Stack>

      <AlumnosFilters />

      {loading ? (
        <Typography>Cargando alumnos...</Typography>
      ) : (
        <AlumnosTable
          count={alumnos.length}
          page={page}
          rows={paginatedAlumnos}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />

      )}
    </Stack>
  );
}

function applyPagination(rows: Alumno[], page: number, rowsPerPage: number): Alumno[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
