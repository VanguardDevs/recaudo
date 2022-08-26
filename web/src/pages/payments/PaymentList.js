import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import { Grid, useMediaQuery } from '@mui/material'
import useFetch from '../../hooks/useFetch'
import Table from '../../components/Table'
import ListContainer from '../../components/ListContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PrintButton from '../../components/DownloadButton';
import { useAdmin } from '../../context/AdminContext'

const options = [
    { 'label': 'Activo', value: 1 },
    { 'label': 'Inactivo', value: 0 }
]

const headCells = [
    {
        id: 'numpago',
        numeric: false,
        disablePadding: true,
        label: 'Número',
    },
    {
        id: 'taxpayer',
        numeric: false,
        disablePadding: true,
        label: 'Contribuyente',
    },
    {
        id: 'item',
        numeric: false,
        disablePadding: true,
        label: 'RIF',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: true,
        label: 'Acciones',
        align: 'center'
    }
];

const PaymentList = ({ initialValues, createButton, title = 'Relación de pagos' }) => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState(initialValues)
    const { state: { perPage, page } } = useAdmin()
    const { loading, total, data } = useFetch('/payments', {
        perPage: perPage,
        page: page,
        filter: filter
    })
    const [items, setItems] = React.useState({})

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setFilter({
                global: e.currentTarget.value
            })
        } else {
            setFilter({})
        }
    }

    const rowRender = () => (
        items.map(row => (
            <TableRow hover tabIndex={-1} key={row.address}>
                <TableCell
                    component="th"
                    id={row.id}
                    scope="row"
                    padding="normal"
                    width='10%'
                >
                    {row.numpago}
                </TableCell>
                <TableCell
                    component="th"
                    id={row.id}
                    scope="row"
                    padding="normal"
                    width='30%'
                >
                    {row.taxpayer.razonsocialdenominacioncomercial}
                </TableCell>
                <TableCell
                    component="th"
                    id={row.id}
                    scope="row"
                    padding="normal"
                    width='10%'
                    textAlign='center'
                >
                    {row.taxpayer.rif}
                </TableCell>
                <TableCell
                    scope="row"
                    align='right'
                    width='10%'
                >
                </TableCell>
            </TableRow>
        )))

    React.useEffect(() => setItems(data), [data])

    return (
        <ListContainer title="Facturas">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{
                    width: isSmall ? '100%' : '60%',
                    backgroundColor: '#fff'
                }}>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <TextField
                                onChange={handleOnChange}
                                InputProps={{
                                    startAdornment: (
                                        <Box marginLeft='6px' display='flex'>
                                            <SearchIcon />
                                        </Box>
                                    )
                                }}
                                placeholder='Buscar'
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{
                    display: 'flex',
                    height: '2rem',
                    width: '8rem',
                    justifyContent: !createButton ? 'end' : 'space-between',
                    alignContent: 'center'
                }}>
                    {items.length ? (
                        <PrintButton
                            perPage={10}
                            filter={filter}
                            basePath='/payments'
                            filename='facturas.pdf'
                            type='pdf'
                            title={title}
                        />
                    ) : <></>}
                </Box>
            </Box>
            <Table
                headCells={headCells}
                rows={items.length && rowRender()}
                loading={loading}
                total={total}
            />
        </ListContainer>
    )
}

PaymentList.defaultProps = {
    initialValues: {},
    createButton: false,
    showTaxpayer: false
}

export default PaymentList
