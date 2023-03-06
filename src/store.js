import { configureStore, createSlice } from "@reduxjs/toolkit"


const employeeStore = createSlice({
    name: 'employee',
    initialState: {
        employeesArray : [],        
    },
   
    reducers: {
        addEmployee: (state, employee) => {
            state.employeesArray.push(employee.payload)
        },
    },
}) 

export const {addEmployee} = employeeStore.actions;

export const store = configureStore({
    reducer: {
        employeeStore: employeeStore.reducer,
    },

})

