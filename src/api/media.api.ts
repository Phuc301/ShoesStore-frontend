import axios from '../utils/axiosCustomize.util';

export const uploadAvatar = async (formData: FormData): Promise<any> => {
  const response = await axios.post('/file/sync-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const uploadImageProduct = async (formData: FormData) : Promise<any> => {
  const response = await axios.post('file/sync-product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
} 

export const uploadProductVariants = async (formData: FormData) : Promise<any> => {
  const response = await axios.post('file/sync-variants', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
} 

