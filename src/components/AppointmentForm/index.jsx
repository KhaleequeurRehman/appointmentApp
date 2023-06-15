import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../config';

const AppointmentForm = () => {

  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({name:'',phone:'',date:dayjs(new Date().now),purpose:''})

  const onChangeHandler = (e) => {
      setFormValues((prev) => ({...prev,[e.target.name]:e.target.value}))
  }
  
  async function makeAppointment(data) {
    let response = await fetch(`${base_url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setFormValues({name:'',phone:'',date:dayjs(new Date().now),purpose:''})
    if(response || response.status === 201 || response.status === 200){
      toast(<p style={{ fontSize: 16 }}>Appointment Added</p>, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=> { navigate('/view') },1200)
      
    }else{
      toast(<p style={{ fontSize: 16 }}>Something went wrong</p>, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log("response makeAppointment ", response);
}

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('formValues ',formValues)
    if(formValues?.name && formValues?.phone && formValues?.date && formValues?.purpose){
      makeAppointment(formValues)
    }else{
      toast(<p style={{ fontSize: 16 }}>fill all fields</p>, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  
  return (
    <>
        <Box 
         component="form"
         noValidate
         autoComplete="off"
         onSubmit={submitHandler}
        >
          <Box sx={{minWidth:"13.125rem",width:'25rem'}}>
            <TextField 
            id="outlined-basic" 
            label="Name"
            margin='normal'
            size='small'
            fullWidth   
            variant="outlined"
            name='name'
            value={formValues.name}
            onChange={onChangeHandler} 
            />
          </Box>
          
          <Box sx={{minWidth:"13.125rem",width:'25rem'}}>
            <TextField 
            id="outlined-basic" 
            label="Number"  
            margin='normal'
            size='small'
            fullWidth 
            variant="outlined"
            type='number'
            name='phone'
            value={formValues.phone}
            onChange={onChangeHandler} 
            />
          </Box>

          <Box sx={{minWidth:"13.125rem",width:'25rem'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                value={formValues.date} 
                onChange={(newdate)=> setFormValues((prev) => ({...prev,date:newdate}))}
                sx={{width:"100%"}}
                />
            </LocalizationProvider>
          </Box>

          <Box sx={{minWidth:"13.125rem",width:'25rem'}}>
            <TextField 
            id="outlined-basic" 
            label="Purpose" 
            margin='normal'
            size='small'
            fullWidth 
            variant="outlined"
            multiline
            rows={4}
            name='purpose'
            value={formValues.purpose}
            onChange={onChangeHandler} 
            />
          </Box>
          <Box sx={{minWidth:"13.125rem",width:'25rem'}}>
            <Button variant="contained" type='submit' fullWidth sx={{mt:"10px"}}>Make Appointment</Button>
          </Box>
        </Box>
        <ToastContainer />
    </>
  )
}

export default AppointmentForm