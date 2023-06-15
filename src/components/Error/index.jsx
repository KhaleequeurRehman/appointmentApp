import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const ErrorCmp = () => {
  return (
    <>
        <Box sx={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Box sx={{width:{xs:"300px",sm:"400px"},height:'130px',display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Typography sx={{lineHeight:1,fontSize:{xs:"6rem",sm:"8rem"},color:'#fd5a5a'}}>404</Typography>
                <Typography sx={{fontSize:{xs:"1rem",sm:"1.3rem"},color:'#ff7070'}}>PAGE NOT FOUND</Typography>
            </Box>
        </Box>
    </>
  )
}

export default ErrorCmp