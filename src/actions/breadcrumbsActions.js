// breadcrumbsActions.js
import { addBreadcrumb, removeLastBreadcrumb, clearBreadcrumbs, setBreadcrumbs } from '../slices/breadcrumbsSlice';

export const addBreadcrumbToChain = (breadcrumb) => (dispatch) => {
  dispatch(addBreadcrumb(breadcrumb));
};

export const removeLastBreadcrumbFromChain = () => (dispatch) => {
  dispatch(removeLastBreadcrumb());
};

export const clearAllBreadcrumbs = () => (dispatch) => {
  dispatch(clearBreadcrumbs());
};

export const updateBreadcrumbs = (newBreadcrumbs) => (dispatch) => {
  dispatch(setBreadcrumbs(newBreadcrumbs));
};
