'use client';
import { useGrados } from './useGrados';
import { Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr';
import { GradosFilters } from '@/components/dashboard/grados/grados-filter';
import { GradosTable } from '@/components/dashboard/grados/grados-table';

export function GradosClient(): React.JSX.Element {
  const gradosState = useGrados();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Grados</Typography>
        </Stack>
        <div>
          <Button
            component={Link}
            href="/dashboard/grados/nuevo"
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Añadir
          </Button>
        </div>
      </Stack>

      <GradosFilters searchTerm={gradosState.searchTerm} setSearchTerm={gradosState.setSearchTerm} />

      {gradosState.loading ? (
        <Typography>Cargando grados...</Typography>
      ) : (
        <GradosTable
          count={gradosState.grados.length}
          page={gradosState.page}
          rows={gradosState.paginatedGrados}
          rowsPerPage={gradosState.rowsPerPage}
          onPageChange={(event, newPage) => gradosState.setPage(newPage)}
          onRowsPerPageChange={(event) => {
            gradosState.setRowsPerPage(parseInt(event.target.value, 10));
            gradosState.setPage(0);
          }}
        />
      )}
    </Stack>
  );
}
