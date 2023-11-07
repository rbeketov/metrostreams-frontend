import { getImageForModeling } from './get-modelings';

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
    modeling_price: 'Тут должна быть цена',
    modeling_image: '/logo.png',
};

export const getModelingsDetail = async (id: number): Promise<ModelingsDetailsImage> => {
    try {
        const response = await fetch(`http://localhost:80/api/modelings/${id}/`, {
            method: 'GET',
        });
        if (!response.ok) {
            return mockModelingDetails;
        }
        const data: ModelingsDetailsData = await response.json();

        const modelingImage = await getImageForModeling(data.modeling_image_url);
        const updatedModelingDetails: ModelingsDetailsImage = {
            ...data,
            modeling_image: modelingImage,
        };

        return updatedModelingDetails;
    } catch (error) {
        return mockModelingDetails;
    }
}
