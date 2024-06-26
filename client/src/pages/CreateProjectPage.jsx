import { useState } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import {
  reasonOptions,
  typeOptions,
  divisonOptions,
  categoryOptions,
  priorityOptions,
  deapartMentOptions,
  locationOptions,
} from "../utils/data";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

import { initialFormValues } from "../utils/data";

export default function SelectLabels() {

  const [dateError,setDateError]=useState(false);

  const [formValues, setFormValues] = useState({
    ...initialFormValues,
    startDate: null,
    endDate: null,
    name: "",
  });

  const handleDateChange = (name, date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: date,
    }));
    setDateError(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validate date fields
    if (!formValues.startDate || !formValues.endDate) {
      setDateError(true);
      console.log("Please select both start date and end date.");
      return;
    }

    if (formValues.endDate.isBefore(formValues.startDate)) {
      setDateError(true);
      console.log("End date cannot be before start date.");
      return;
    }

    // Prepare data for backend
    const dataToSend = {
      ...formValues,
      startDate: formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : null,
      endDate: formValues.endDate ? formValues.endDate.format('YYYY-MM-DD') : null,
      status: "Registered", // Assuming status is fixed for now
    };

    console.log("Data to send to backend:", dataToSend);
   
    try {
   const response = await fetch('/api/project/submit',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  });

  const result = await response.json();
  if(response.ok){
    console.log(result);
    setDateError(false);
    setFormValues({...initialFormValues , startDate:null,endDate:null,name:""});
    
  }else{
    console.log(result.message);
  }
    }catch(err){
      console.log(err);
    }

  };

  return (
    <Layout title="Create Project">
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:overflow-hidden px-3 py-3 pb-10 pt-[25px] rounded-lg shadow-2xl mb-6 flex flex-col sm:flex-row sm:px-7 sm:justify-between sm:gap-5 sm:mt-[92px] sm:pt-[45px] sm:ml-5 sm:mr-[12px] sm:shadow-xl sm:z-100 sm:border sm:pb-[76px] sm:border-gray-200 sm:z-59"
      >
        <div className="sm:flex sm:flex-col sm:gap-3 sm:w-full sm:flex-1">
          <textarea
            required 
            name='name'
            onChange={handleChange}
            value={formValues.name}
            placeholder="Enter Project Theme"
            className="w-full sm:w-[59vw] h-[95px] sm:h-[80px] rounded-lg px-4 sm:px-8 text-lg py-3 mb-7 resize-none outline-none border border-1 border-gray-500"
          />
          <div className="flex flex-col gap-4 mb-5 sm:mb-0 sm:flex-col sm:flex sm:gap-5">
            <div className="flex sm:flex-row flex-col gap-5 sm:flex sm:gap-12">
              <FormInput
                name="reason"
                onChange={handleChange}
                options={reasonOptions}
                value={formValues.reason}
                label={"Reason"}
              />
              <FormInput
                name="type"
                onChange={handleChange}
                options={typeOptions}
                value={formValues.type}
                label={"Type"}
              />
              <FormInput
                name="division"
                onChange={handleChange}
                options={divisonOptions}
                value={formValues.division}
                label={"Division"}
              />
            </div>
            <div className="flex flex-col gap-5 sm:flex sm:flex-row sm:gap-12">
              <FormInput
                name="category"
                onChange={handleChange}
                options={categoryOptions}
                value={formValues.category}
                label={"Category"}
              />
              <FormInput
                name="priority"
                onChange={handleChange}
                options={priorityOptions}
                value={formValues.priority}
                label={"Priority"}
              />
              <FormInput
                name="department"
                onChange={handleChange}
                options={deapartMentOptions}
                value={formValues.department}
                label={"Department"}
              />
            </div>
            <div className="flex sm:flex-row flex-col gap-5 sm:flex sm:gap-12">
              <div className="flex flex-col sm:w-[23vw]">
                <label className="text-gray-500 ml-1">Start date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formValues.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          placeholder="Y Month Dr"
                          sx={{
                            '.MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              paddingBlock:"0px"
                            },
                            '.MuiOutlinedInput-notchedOutline': {
                              borderRadius: '10px',
                              paddingBlock:"0px"
                            },
                          }}
                          value={formValues.startDate ? formValues.startDate.format('YYYY MMMM DD') : ''}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col sm:w-[23vw]">
                <label className="text-gray-500 ml-1">End date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formValues.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          placeholder="Y Month Dr"
                          sx={{
                            '.MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              paddingBlock:"0px"
                            },
                            '.MuiOutlinedInput-notchedOutline': {
                              borderRadius: '10px',
                              paddingBlock:"0px"
                            },
                          }}
                          value={formValues.endDate ? formValues.endDate.format('YYYY MMMM DD') : ''}
                        />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </div>
              <FormInput
                name="location"
                onChange={handleChange}
                options={locationOptions}
                value={formValues.location}
                label={"Location"}
              />
            </div>
          </div>
          <div className="sm:my-[3px] sm:mr-[14vw] sm:self-end sm:mb-8">
            <span className="text-gray-700">Status: </span>
            <span className="font-semibold py-2">Registered</span>
          </div>
        </div>
        <div className="flex items-center flex-col px-2 my-8 sm:my-6 sm:mx-[1px]">
          <button
            type="submit"
            className="w-full self-center sm:px-12 rounded-3xl bg-blue-600 text-white py-2 h-fit"
          >
            Save Project
          </button>
        {
        dateError && <p className=" sm:absolute bottom-12 left-2/4  text-red-400 text-sm py-1" >Select The  Correct Dats</p>
        }
        </div>
      </form>
    </Layout>
  );
}
