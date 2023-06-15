import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import UpdateAppointmentModal from '../UpdateAppointmentModal';
import { base_url } from '../../config';

const ViewAppointments = () => {

  const [appointments, setAppointments] = useState()
  const [updateAppointmentModal, setUpdateAppointmentModal] = React.useState(false);
  const [formValues, setFormValues] = useState({name:'',phone:'',date:dayjs(new Date().now),purpose:''})

  const onChangeHandler = (e) => {
    setFormValues((prev) => ({...prev,[e.target.name]:e.target.value}))
  }

  async function fetchAppointments() {
    let response = await fetch(`${base_url}`);
    response = await response.json();
    // let dataArr = Object.keys(response).map((item,i)=> ({...response[item],date:moment(response[item]?.date).format('DD/MM/YYYY'),id:i,appointmentId:item}))
    let dataArr = Object.keys(response).map((item,i)=> ({...response[item],date:response[item]?.date,id:i+1,appointmentId:item}))
    console.log("response fetchAppointments ", dataArr);
    setAppointments(dataArr)
  }

  async function deleteAppointment(id) {
    let response = await fetch(`${base_url}/${id}`, {
      method: "DELETE",
    });
    console.log("response deleteAppointment ", response);
    if(response || response.status === 200){
      toast(<p style={{ fontSize: 16 }}>Appointment has been deleted</p>, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      fetchAppointments()
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
  }


  async function updateAppointment(data) {
    let response = await fetch(`${base_url}/${data?.appointmentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setFormValues({name:'',phone:'',date:dayjs(new Date().now),purpose:''})
    if(response || response.status === 201 || response.status === 200){
      toast(<p style={{ fontSize: 16 }}>Appointment Updated</p>, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=> { fetchAppointments() },1000)
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
    console.log("response updateAppointment ", response);
}

  const updateHandler = () => {
    console.log('formValues ',formValues)
    if(formValues?.name && formValues?.phone && formValues?.date && formValues?.purpose){
      updateAppointment(formValues)
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

 


  useEffect(() => {
    fetchAppointments()
  
  }, [])
  

  // const rows = [
  //   { 
  //     id:1,
  //     name: 'John Doe',
  //     phone: 'John Doe', 
  //     date: '2-3-2022', 
  //     purpose: 'Abc purpose', 
  //   },
  //   { 
  //     id:2,
  //     name: 'John Doe',
  //     phone: 'John Doe', 
  //     date: '2-3-2022', 
  //     purpose: 'Abc purpose', 
  //   },
  //   { 
  //     id:3,
  //     name: 'John Doe',
  //     phone: 'John Doe', 
  //     date: '2-3-2022', 
  //     purpose: 'Abc purpose', 
  //   },
  //   { 
  //     id:4,
  //     name: 'John Doe',
  //     phone: 'John Doe', 
  //     date: '2-3-2022', 
  //     purpose: 'Abc purpose', 
  //   },
  //   { 
  //     id:5,
  //     name: 'John Doe',
  //     phone: 'John Doe', 
  //     date: '2-3-2022', 
  //     purpose: 'Abc purpose', 
  //   },
    
  // ];

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 150, 
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150 
    },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      width: 150 
    },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 150,
      renderCell: (params) => (
        <>
          {moment(params?.value).format('DD/MM/YYYY')}
        </>
      ),   
    },
    { 
      field: 'purpose', 
      headerName: 'Purpose', 
      width: 150 
    },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={()=> {
              setUpdateAppointmentModal(true)
              setFormValues({name:params?.row?.name,phone:params?.row?.phone,date:dayjs(new Date().now),purpose:params?.row?.purpose,appointmentId:params?.row?.appointmentId})
            }}
          >
            update
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ml:"1rem"}}
            onClick={()=> { deleteAppointment(params?.row?.appointmentId) }}
          >
            delete
          </Button>
        </Box>
      ),  
    },
  ];
  

  return (
    <>
      <Typography  sx={{textAlign:'center',mt:"2rem",mb:'1rem',color:'#1976d2'}} variant='h4'>VIEW APPOINTMENTS</Typography>
      <Box sx={{mx: 'auto', width:"75%",minHeight:"100vh",display:"flex",justifyContent:'center'}}>
        <DataGrid 
        rows={appointments ? appointments : []} 
        columns={columns} 
        />
      </Box>
      <ToastContainer />

      <UpdateAppointmentModal
        title="Update Appointment"
        aria-labelledby="customized-dialog-title"
        open={updateAppointmentModal}
        handleClose={()=> {setUpdateAppointmentModal(false)}}
        actionBtn2OnClickHandler={updateHandler}
        >
          <Box 
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={updateHandler}
          >
            <Box sx={{my:"20px",minWidth:{xs:"310px",sm:"400px",md:"500px"},mb:"20px"}}>
              <Box sx={{width:'95%'}}>
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
              <Box sx={{width:'95%'}}>
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
              <Box sx={{width:'95%'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    value={formValues.date} 
                    onChange={(newdate)=> setFormValues((prev) => ({...prev,date:newdate}))}
                    sx={{width:"100%"}}
                    />
                </LocalizationProvider>
              </Box>

              <Box sx={{width:'95%'}}>
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
            </Box>
          </Box>
        </UpdateAppointmentModal>
    </>
  )
}

export default ViewAppointments