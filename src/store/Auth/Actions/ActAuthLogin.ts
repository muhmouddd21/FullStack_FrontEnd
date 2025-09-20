import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/axios-global";
import { signInType } from '@validations/signInSchema';
import { isAxiosError } from "axios";

type TResponse ={
        user:{
            id:number,
            email:string,
            username:string
        } | null,
        jwt:string|null
}

const ActAuthLogin =createAsyncThunk('auth/AuthLogin',async(formData:signInType,Thunkapi)=>{

    const {rejectWithValue,fulfillWithValue} = Thunkapi;
    const {email,password} = formData;
    const payload ={email,password}
try {
    const response =await api.post<TResponse>('/auth/login',payload);

    
    return fulfillWithValue(response.data);
} catch (error) {
       if (isAxiosError(error)) {
                   const serverData = error.response?.data;
                   
                 if (serverData?.errors) {
                   const flatErrors = Object.values(serverData.errors)
                       .flat()
                       .join(", ");
                   return rejectWithValue(flatErrors); // always a string
                   }
                   return rejectWithValue(serverData?.message || error.message);
               } else {
                   return rejectWithValue("An unexpected error");
           }   
}

});

export default ActAuthLogin;