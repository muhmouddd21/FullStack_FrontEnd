import { createSlice } from "@reduxjs/toolkit";


import ActAuthLogin from "./Actions/ActAuthLogin";
import ActAuthRegister from "./Actions/ActAuthRegister";
import ActAuthLogout from "./Actions/ActAuthLogout";
import ActCheckAuth from "./Actions/ActCheckAuth";
import { TLoading, TUser } from "@customtypes/index";


interface IAuthState{
    user: TUser| null,
    loading:TLoading
    error:string|null
    jwt:string|null
    isInitialized:boolean
}

const initialState:IAuthState={
    user:null,
    loading:"idle",
    error:null,
    jwt:null,
    isInitialized: false,
}

const AuthSlice =createSlice({
    name:"AuthSlice",
    initialState:initialState,
    reducers:{
        resetUI:(state)=>{
            state.loading="idle";
            state.error=null;
        },
        logOut:(state)=>{
            state.jwt =null;
            state.user =null;
        },
        setAccessToken:(state,action)=>{
      
            state.jwt=action.payload.token;
        }
    },
    extraReducers(builder){
        builder.addCase(ActAuthRegister.pending,(state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(ActAuthRegister.fulfilled,(state)=>{
            state.loading = "succeeded";

        });
        builder.addCase(ActAuthRegister.rejected,(state,action)=>{
            state.loading = "failed";
            
            if (typeof action.payload ==="string"){
                state.error = action.payload;
            }
            
        });
        builder.addCase(ActAuthLogin.pending,(state)=>{
            state.loading = "pending";
            state.error=null

        });
        builder.addCase(ActAuthLogin.fulfilled,(state,action)=>{
            state.loading = "succeeded";
            state.user=action.payload.user;
            state.jwt=action.payload.jwt;
            
        });
        builder.addCase(ActAuthLogin.rejected,(state,action)=>{
            state.loading = "failed";
            if (typeof action.payload ==="string"){
                state.error = action.payload;
            }
            
        });
        builder.addCase(ActAuthLogout.pending,(state)=>{
            state.loading = "pending";
            state.error=null

        });
        builder.addCase(ActAuthLogout.fulfilled,(state)=>{
            state.loading = "succeeded";
            state.jwt = null;
            state.user = null; 
        });
        builder.addCase(ActAuthLogout.rejected,(state,action)=>{
            state.loading = "failed";
            if (typeof action.payload ==="string"){
                state.error = action.payload;
            }
            
        });
        builder
            // ... (loginUser cases)
            // --- Handle checkAuth cases ---
            .addCase(ActCheckAuth.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(ActCheckAuth.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = action.payload.user; 
                state.jwt = action.payload.accessToken;
                state.isInitialized = true;
                
            })
            .addCase(ActCheckAuth.rejected, (state) => {
                state.loading = 'failed';
                state.isInitialized = true; 

            });


        
    }
})

export default AuthSlice.reducer
export const {resetUI,logOut,setAccessToken} = AuthSlice.actions