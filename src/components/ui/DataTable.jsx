import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function DataTable({
  title,
  description,
  columns = [],
  data = [],
  loading = false,
  onRowClick,
  emptyMessage = 'Aucune donnée disponible',
  emptyIcon: EmptyIcon,
  className = '',
  headerActions,
  rowClassName = ''
}) {
  const handleRowClick = (row, index) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] overflow-hidden p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          <span className="ml-3 text-[var(--color-foreground-muted)]">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {(title || description || headerActions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            {title && <h2 className="text-lg font-semibold text-[var(--color-foreground)]">{title}</h2>}
            {description && <p className="text-sm text-[var(--color-foreground-muted)]">{description}</p>}
          </div>
          {headerActions && (
            <div className="flex-shrink-0">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
        {data.length === 0 ? (
          <div className="text-center py-12 border rounded-lg border-[var(--color-border)]">
            {EmptyIcon && <EmptyIcon className="mx-auto h-12 w-12 text-[var(--color-foreground-muted)] mb-4" />}
            <h3 className="text-sm font-medium text-[var(--color-foreground)]">
              {emptyMessage}
            </h3>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--color-background)] hover:bg-[var(--color-background)]">
                {columns.map((column) => (
                  <TableHead 
                    key={column.key || column.accessor} 
                    className={`${column.headerClassName || ''} ${column.align === 'right' ? 'text-right' : ''}`}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  className={`${rowClassName} ${onRowClick ? 'cursor-pointer hover:bg-[var(--color-background)]' : ''} ${
                    rowIndex % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-background)]'
                  }`}
                  onClick={() => handleRowClick(row, rowIndex)}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.key || column.accessor}
                      className={`${column.cellClassName || ''} ${column.align === 'right' ? 'text-right' : ''}`}
                    >
                      {column.cell ? column.cell(row) : row[column.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default DataTable;
