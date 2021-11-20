import {
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Typography,
  styled,
  TableFooter
} from '@mui/material'
import TablePaginationActions from 'components/Pagination/TablePagination'
import TablePagination from '@mui/material/TablePagination'
import { useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'

const Profile = styled('div')(`
    display: flex;
    align-items: center;
  `)

export const TableProfileImg = styled('div', {
  shouldForwardProp: () => true
})(({ url }: { url?: string }) => ({
  height: '24px',
  width: '24px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '8px',
  background: `#000000 ${url ? `url(${url})` : ''}`
}))

export function OwnerCell({ url, name }: { url?: string; name: string }) {
  return (
    <Profile>
      <TableProfileImg url={url} />
      {name}
    </Profile>
  )
}

const StyledTableContainer = styled(TableContainer)({
  display: 'table',
  // backgroundColor: '#ffffff',
  borderRadius: '40px',
  '& .MuiTableCell-root': {
    fontSize: '16px',
    borderBottom: 'none',
    fontWeight: 400,
    padding: '14px 20px',
    '& svg': {
      marginRight: 8
    },
    '&:first-child': {
      paddingLeft: 50
    },
    '&:last-child': {
      paddingRight: 50
    }
  },
  '& table': {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px'
  }
})

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  borderRadius: 8,
  overflow: 'hidden',
  '& .MuiTableCell-root': {
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '12px 20px 12px 0',
    fontSize: '12px',
    color: theme.palette.text.secondary,
    borderBottom: 'none',
    '&:first-child': {
      paddingLeft: 20,
      borderTopLeftRadius: 8
    },
    '&:last-child': {
      paddingRight: 20,
      borderTopRightRadius: 8,
      textAlign: 'end'
    }
  }
}))

const StyledTableRow = styled(TableRow)({
  height: 72,
  backgroundColor: '#F2F5FA',
  borderRadius: '16px',
  marginTop: '8px',
  overflow: 'hidden',
  '& .MuiTableCell-root': {
    justifyContent: 'flex-start',
    '&:first-child': {
      padding: '14px 20px',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },
    '&:last-child': {
      padding: '14px 20px',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      textAlign: 'end'
    }
  },
  '&:hover': {
    backgroundColor: ' #E2E7F0'
  }
})

const Card = styled('div')(`
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 30px;
    padding: 24px;
    > div {
      width: 100%;
    }
  `)

const CardRow = styled('div')(`
    display: flex;
    justify-content: space-between;
    grid-template-columns: auto 100%;
    > div:first-child {
      white-space: nowrap;
    }
    > div:last-child {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  `)

export default function TableWithPagination({
  header,
  rows
}: {
  header: string[]
  rows: (string | number | JSX.Element)[][]
}) {
  const matches = useBreakpoint()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      {matches ? (
        <>
          {rows.map((data, index) => (
            <Card key={index}>
              <Box display="flex" flexDirection="column" gap="16px">
                {header.map((headerString, index) => (
                  <CardRow key={index}>
                    <Typography variant="inherit">{headerString}</Typography>
                    <Typography sx={{ color: theme => theme.palette.text.secondary }}>
                      {' '}
                      {data[index] ?? null}
                    </Typography>
                  </CardRow>
                ))}
              </Box>
            </Card>
          ))}
        </>
      ) : (
        <StyledTableContainer>
          <table>
            <StyledTableHead>
              <TableRow>
                {header.map((string, idx) => (
                  <TableCell key={idx}>{string}</TableCell>
                ))}
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                (row, idx) => (
                  <StyledTableRow key={row[0].toString() + idx}>
                    {row.map((data, idx) => (
                      <TableCell key={idx}>{data}</TableCell>
                    ))}
                  </StyledTableRow>
                )
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </table>
        </StyledTableContainer>
      )}
    </>
  )
}
