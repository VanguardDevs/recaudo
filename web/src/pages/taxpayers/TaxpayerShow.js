import * as React from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import axios from '../../api'
import TextField from '../../components/TextField';
import LinkIconButton from '../../components/LinkIconButton';
import LoadingIndicator from '../../components/LoadingIndicator'
import { setTitle, useAdmin } from '../../context/AdminContext'
import PaymentList from '../payments/PaymentList';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TaxpayerShow = () => {
    const { dispatch } = useAdmin()
    const { id } = useParams();
    const [record, setRecord] = React.useState(null)

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/taxpayers/${id}`);

        setRecord(data);
    }, []);

    React.useEffect(() => {
        fetchRecord()
    }, [])

    React.useEffect(() => {
        if (record) {
            setTitle(dispatch, `Contribuyente #${record.id}`)
        }
    }, [record])

    if (!record) return <LoadingIndicator />;

    return (
        <Box width='100%' height='100%'>
            <Box sx={{
                display: 'flex',
                backgroundColor: theme => theme.palette.secondary.main,
                padding: '1.5rem 1rem',
                borderRadius: 1,
                marginBottom: '1rem'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1'
                }}>
                    <Box fontSize='1.1rem' fontWeight='600'>
                        {record.razonsocialdenominacioncomercial}
                    </Box>
                    <Box fontWeight='300' fontSize='0.9rem'>
                        {record.rif}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        '& > *': {
                            marginRight: '1rem'
                        }
                    }}>
                        <TextField
                            source={record.direccion}
                            icon={<LocationOnIcon />}
                        />
                    </Box>
                </Box>
                <Box alignSelf='start'>
                    <LinkIconButton href={`/taxpayers/${record.id}/edit`} />
                </Box>
            </Box>
            <PaymentList initialValues={{
                contribuyente_id: id
            }} title={`Pagos del contribuyente "${record.name}"`} />
        </Box>
    )
}

export default TaxpayerShow
