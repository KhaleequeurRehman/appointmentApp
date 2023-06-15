import React from 'react'
import Box from '@mui/material/Box';
import AppointmentForm  from '../../components/AppointmentForm'
import Typography from '@mui/material/Typography';

const index = () => {
  return (
    <>
        <Typography  sx={{textAlign:'center',mt:"2rem",mb:'1rem',color:'#1976d2'}} variant='h4'>APPOINTMENT FORM</Typography>
        <Box sx={{minWidth:"100%",minHeight:"100vh",display:"flex",justifyContent:'center'}}>
            <AppointmentForm />
        </Box>
    </>
  )
}

export default index