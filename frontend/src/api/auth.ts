import { apiService } from ".";
import {CreateUserDto} from '../../../backend/src/users/dto/create-user.dto'

export const postLoginApi = async(data:CreateUserDto)=>{
    
    return await apiService.post('/users/login',data)
}
export  const postRegisterApi = async(data:CreateUserDto)=>{

    console.log('from auth',data);
    
return await apiService.post('/users',data)
}

export const getAllUsers = async ()=>{
    return await apiService.get('/users')
}