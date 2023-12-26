import axios from 'axios';
import { toast } from 'react-toastify';

import { getModelingsDetail } from '../modules/get-modelings-detail';
import { setModelingsDetailsSlice } from '../slices/modelingsDetailsSlice';


function transliterate(text) {
  const cyrillicToLatinMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'sch', ы: 'y', э: 'e', ю: 'yu', я: 'ya',
    А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'E', Ж: 'Zh',
    З: 'Z', И: 'I', Й: 'Y', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O',
    П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', Х: 'Kh', Ц: 'Ts',
    Ч: 'Ch', Ш: 'Sh', Щ: 'Sch', Ы: 'Y', Э: 'E', Ю: 'Yu', Я: 'Ya',
  };

  return text
    .split('')
    .map(char => {
      if (char === ' ') {
        return '_';
      } else if (cyrillicToLatinMap[char]) {
        return cyrillicToLatinMap[char];
      } else {
        return char;
      }
    })
    .join('');
}


export const getModelingsDetails = (id) => async (dispatch) => {
  try {

    const response = await getModelingsDetail(id);

    dispatch(setModelingsDetailsSlice(response));
  } catch (error) {
    console.error(`Ошибка при получении данных о модели ID: ${id}:`, error);
  }
};

export const updateModelingDetails = (id, data) => async () => {
  try {
    
    if (id && data.modeling_image !== null) {
      const imageName = transliterate(data.modeling_name) + ".jpeg";

      await axios.put(`http://localhost:80/upload-images/${imageName}`, 
        data.modeling_image,
        {
          headers: {
            'Content-Type': 'image/jpeg',
          },
          withCredentials: true,
        }
      );

      await axios.put(`http://localhost:80/api/modelings/${id}/edit/`, 
        {
          modeling_name: data.modeling_name,
          modeling_description: data.modeling_description,
          modeling_price: data.modeling_price,
          load: data.load,
          modeling_image_url: imageName, 
        },
        {
          withCredentials: true,
        }
      );
      toast.success('Изменения сохранены');
    } else if (id) {
      await axios.put(`http://localhost:80/api/modelings/${id}/edit/`, 
        {
          modeling_name: data.modeling_name,
          modeling_description: data.modeling_description,
          modeling_price: data.modeling_price,
          load: data.load,
        },
        {
          withCredentials: true,
        }
      );
      toast.success('Изменения сохранены');
    }
    
  } catch (error) {
    console.error(`Ошибка при изменении данных модели ID: ${id}:`, error);
  }
};



export const createModelings = (data) => async () => {
  try {
    if (
      data.modeling_image === null ||
      data.modeling_name === '' ||
      data.modeling_name === null ||
      data.modeling_price === '' ||
      data.modeling_price === null ||
      data.load === null
    ) {
      toast.error('Невозможно создавть вид моделирования без обязательных полей');
      return -1;
    }

    const imageName = transliterate(data.modeling_name) + ".jpeg";

    await axios.put(`http://localhost:80/upload-images/${imageName}`, 
      data.modeling_image,
      {
        headers: {
          'Content-Type': 'image/jpeg',
        },
        withCredentials: true,
      }
    );

    await axios.post(`http://localhost:80/api/modelings/create/`, 
      {
        modeling_name: data.modeling_name,
        modeling_description: data.modeling_description,
        modeling_price: data.modeling_price,
        load: data.load,
        modeling_image_url: imageName, 
      },
      {
        withCredentials: true,
      }
    );
    toast.success('Добавлен новый вид моделирования');
    return 0;

  } catch (error) {
    console.error(`Ошибка при изменении данных модели ID: ${id}:`, error);
  }
};