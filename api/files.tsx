import axios from '@/core/axios';
import { FileItem } from './dto/files.dto';

type FileType = 'all' | 'photos' | 'trash';

export const getAll = async (type: FileType = 'all'): Promise<FileItem[]> => {
    const { data } = await axios.get(`/files?type=${type}`);

    return data;
};

export const remove = (ids: number[]): Promise<void> => {
    return axios.delete(`/files?ids=${ids}`);
};

export const uploadFile = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append('file', file);

    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onProgress: (e: ProgressEvent) => {
            onProgress({ percent: (e.loaded / e.total) * 100 });
        },
    };

    try {
        const { data } = await axios.post('files', formData, config);

        onSuccess();

        return data;
    } catch (e) {
        onError({ e });
    }
};
