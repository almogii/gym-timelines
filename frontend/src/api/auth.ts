import { apiService } from ".";
import {CreateUserDto} from '../../../backend/src/users/dto/create-user.dto'


export  const postRegisterApi = async(data:CreateUserDto)=>{

    console.log('from auth',data);
    
return await apiService.post('/users',data)
}

export const getAllUsers = async ()=>{
    return await apiService.get('/users')
}
 

export const postLoginApi = async (data: { email: string; password: string }) => {
    return await apiService.post('/users/login', data);
  };
