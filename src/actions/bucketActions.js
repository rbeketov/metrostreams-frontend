import axios from 'axios';
import { setBucketItem } from '../slices/bucketSlice.js';
import { getApplicationById } from "../modules/get-application-byid.ts";

export const getBucket = (draft_id) => async (dispatch) => {
  try {
    const application = await getApplicationById(draft_id);

    if (application) {
        dispatch(setBucketItem(application.modeling));
    }
  } catch (error) {
    console.error('Error getBucket:', error);
  }
};

export const addModelingToBucket = (modeling_id) => async (dispatch, getState) => {
  try {
    const { draft_id } = getState().auth;
    const response = await axios.post(
      `http://localhost:80/api/modelings/add/`,
      {
        modeling_id,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      dispatch(getBucket(draft_id));
    } else {
      console.error(`Failed to add modeling to bucket. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding modeling to bucket:', error);
  }
};

export const deleteModelingFromBucket = (modeling_id) => async (dispatch, getState) => {
  try {
    const { draft_id } = getState().auth;

    const response = await axios.delete(`http://localhost:80/api/applications/${draft_id}/delete_modeling/`, {
      data: { modeling_id },  // Используйте data вместо params для DELETE-запроса
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch(getBucket(draft_id));
    } else {
      console.error(`Failed to delete modeling from bucket. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting modeling from bucket:', error);
  }
};
