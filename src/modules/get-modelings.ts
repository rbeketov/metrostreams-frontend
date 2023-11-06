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
    modeling_name: 'Модель 1',
    modeling_price: '199.00',
    modeling_image: '/logo.png',
  },
  {
    modeling_id: 2,
    modeling_name: 'Модель 2',
    modeling_price: '299.00',
    modeling_image: '/logo.png',
  },
  {
    modeling_id: 3,
    modeling_name: 'Модель 3',
    modeling_price: '399.00',
    modeling_image: '/logo.png',
  },
];

export const getModelings = async (name = '', minPrice = 0, maxPrice = 99000): Promise<ModelingImage[]> => {
  try {
    const response = await fetch(`http://localhost:80/api/modelings/?name=${name}&price_under=${minPrice}&price_upper=${maxPrice}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data: ModelingData[] = await response.json();

      const modelingImageData: ModelingImage[] = [];

      for (const model of data) {
        modelingImageData.push({
          modeling_id: model.modeling_id,
          modeling_name: model.modeling_name,
          modeling_price: model.modeling_price,
          modeling_image: await getImageForModeling(model.modeling_image_url),
        });
      }      

      return modelingImageData;
    } else {
      return mockModelings;
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    return mockModelings;
  }
}



async function getImageForModeling(modelingUrl: string): Promise<string> {
  try {
    const response = await fetch(`http://localhost:80/bucket-modelings/${modelingUrl}`, {
      method: 'GET',
    });

    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      const base64String = arrayBufferToBase64(imageBuffer);
      return `data:image/jpeg;base64,${base64String}`;
    } else {
      return '/logo.png';
    }
  } catch (error) {
    console.error(`Ошибка получения изображения для модели ${modelingUrl}: ${error}`);
    return '/logo.png';
  }
}


function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const binaryArray = new Uint8Array(arrayBuffer);
  const binaryString = String.fromCharCode(...binaryArray);
  const base64String = btoa(binaryString);
  return base64String;
}
