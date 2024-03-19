import axios from '@/core/axios';
import {
    LoginFormDTO,
    LoginResponseDTO,
    RegisterFormDTO,
    RegisterResponseDTO,
} from './dto/auth.dto';

export const login = async (values: LoginFormDTO): Promise<LoginResponseDTO> => {
    const { data } = await axios.post('/auth/login', values);

    return data;
};

export const register = async (values: RegisterFormDTO): Promise<RegisterResponseDTO> => {
    const { data } = await axios.post('/auth/register', values);

    return data;
};
