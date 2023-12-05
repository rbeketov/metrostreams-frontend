import axios from 'axios';

export interface ModelingImage {
  modeling_id: number;
  modeling_name: string;
  modeling_price: string;
  modeling_image: string;
}

export interface ModelingData {
  modeling_id: number;
  modeling_name: string;
  modeling_price: string;
  modeling_image_url: string;
}

const mockModelings: ModelingImage[] = [
  {
    modeling_id: 1,
    modeling_name: 'Станция Щёлковская',
    modeling_price: '1199.00',
    modeling_image: '/mock.jpg',
  },
  {
    modeling_id: 2,
    modeling_name: 'Станция Бауманская',
    modeling_price: '1299.00',
    modeling_image: '/mock.jpg',
  },
  {
    modeling_id: 3,
    modeling_name: 'Станция Аэропорт',
    modeling_price: '5399.00',
    modeling_image: '/mock.jpg',
  },
  {
    modeling_id: 4,
    modeling_name: 'Станция Митино',
    modeling_price: '999.00',
    modeling_image: '/mock.jpg',
  },
  {
    modeling_id: 5,
    modeling_name: 'Станция Курская',
    modeling_price: '5399.00',
    modeling_image: '/mock.jpg',
  },
];


const MAX_IMAGE_RETRIES = 3;

export const getModelings = async (name = '', minPrice = 0, maxPrice = 99000): Promise<[number | null, ModelingImage[]]> => {
  try {
    const response = await axios.get(`http://localhost:80/api/modelings/?name=${name}&price_under=${minPrice}&price_upper=${maxPrice}`,
    {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data: ModelingData[] = response.data.modeling_objects;

      const draft_id = response.data.draft_id;

      const modelingImageData: ModelingImage[] = [];

      for (const model of data) {
        let retries = 0;
        let modelingImage: string | null = null;

        while (retries < MAX_IMAGE_RETRIES) {
          try {
            modelingImage = await getImageForModeling(model.modeling_image_url);
            break;
          } catch (error) {
            console.error(`Ошибка во время загрузки изображения для модели ${model.modeling_image_url}: ${error}`);
            retries++;
          }
        }

        modelingImageData.push({
          modeling_id: model.modeling_id,
          modeling_name: model.modeling_name,
          modeling_price: model.modeling_price,
          modeling_image: modelingImage || '/mock.jpg',
        });
      }
      return [draft_id, modelingImageData];
    } else {
      return [null, mockModelings];
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    return [null, mockModelings];
  }
}


export async function getImageForModeling(modelingUrl: string): Promise<string> {
  for (let retries = 0; retries < MAX_IMAGE_RETRIES; retries++) {
    try {
      const response = await axios.get(`http://localhost:80/bucket-modelings/${modelingUrl}`, {
        responseType: 'arraybuffer',
        withCredentials: true,
      });

      if (response.status === 200) {
        const imageBuffer = response.data;
        const base64String = arrayBufferToBase64(imageBuffer);
        return `data:image/jpeg;base64,${base64String}`;
      }
    } catch (error) {
      console.error(`Ошибка во время загрузки изображения для модели ${modelingUrl}: ${error}`);
    }
  }
  return '/mock.jpg';
}


function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const binaryArray = new Uint8Array(arrayBuffer);
  const len = binaryArray.length;
  let binaryString = '';

  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(binaryArray[i]);
  }

  return btoa(binaryString);
}
