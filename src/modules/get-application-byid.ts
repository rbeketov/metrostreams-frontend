import axios from 'axios';

interface UserModel {
  user_id: number;
  first_name: string;
  second_name: string;
  email: string;
}

interface ModeratorModel {
  moderator_id: number;
  first_name: string;
  second_name: string;
  email: string;
}

interface ModelingModel {
  modeling_id: number;
  modeling_name: string;
  modeling_description: string;
  modeling_price: number;
  modeling_image_url: string;
}

interface ApplicationData {
  people_per_minute: number;
  time_interval: number;
  date_application_create: string;
  date_application_accept: string | null;
  date_application_complete: string | null;
  status_application: string;
}

interface Application {
  application_id: number;
  application_data: ApplicationData;
  user_data: UserModel;
  moderator_data: ModeratorModel;
  modeling: ModelingModel[];
}

export async function getApplicationById(pk: string): Promise<Application | null> {
  try {
    const response = await axios.get<Application>(`http://localhost:80/api/applications/${pk}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Failed to fetch application. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
}

export default getApplicationById;
