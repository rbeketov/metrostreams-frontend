import { getImageForModeling } from './get-modelings';
import axios from 'axios';

export interface ModelingsDetailsData {
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_image_url: string;
}

export interface ModelingsDetailsImage {
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_image: string;
}

const mockModelingDetails: ModelingsDetailsImage = {
    modeling_name: 'Тут должен быть продукт моделирования',
    modeling_description: 'Тут должна быть информация о продукте моделирования',
    modeling_price: '(Тут должна быть цена)',
    modeling_image: '/mock.jpg',
};

export const getModelingsDetail = async (id: number): Promise<ModelingsDetailsImage> => {
    try {
      const response = await axios.get(`http://localhost:80/api/modelings/${id}/`,
      {
        withCredentials: true,
      });
  
      if (response.status !== 200) {
        return mockModelingDetails;
      }
  
      const data: ModelingsDetailsData = response.data;
      
      const modelingImage = await getImageForModeling(data.modeling_image_url);
      
      const updatedModelingDetails: ModelingsDetailsImage = {
        ...data,
        modeling_image: modelingImage,
      };
  
      return updatedModelingDetails;
    } catch (error) {
      console.error(`Ошибка во время загрузки изображения для модели ID: ${id}: ${error}`);
      return mockModelingDetails;
    }
  };
  
