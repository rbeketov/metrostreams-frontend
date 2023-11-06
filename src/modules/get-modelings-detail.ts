import { getImageForModeling } from './get-modelings';

export interface ModelingsDetailsData {
    modeling_id: number;
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_image_url: string;
}

export interface ModelingsDetailsImage {
  modeling_id: number;
  modeling_name: string;
  modeling_description: string;
  modeling_price: string;
  modeling_image_image: string;
}

const mockModelingDetails: ModelingsDetails = {
    modeling_id: 100100,
    modeling_name: 'Тут должен быть продукт моделирования',
    modeling_description: 'Тут должна быть информация о продукте моделирования',
    modeling_price: 'Тут должна быть цена',
    modeling_image: '/logo.png',
  };

export const getModelingsDetail = async (id: number): Promise<ModelingsDetails> => {
    try {
      const response = await fetch(`http://localhost:80/api/modelings/${id}/`, {
        method: 'GET',
      });
      if (!response.ok) {
        return mockModelingDetails;
      }
      const data: ModelingsDetails = await response.json();
      return data;
    } catch (error) {
      return mockModelingDetails;
    }
  }
  
