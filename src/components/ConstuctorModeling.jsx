import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateModelingDetails, getModelingsDetails, createModelings } from '../actions/modelingsDetailsActions';
import { setModelingDetailField, toInitState } from '../slices/modelingsDetailsSlice.js';
import NavbarAnyMetro from './Navbar';
import Header from './Header';
import { useCustomNavigate } from '../modules/redirect';
import '../style/ConstuctorModeling.css';

const ConstructorPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id === "0") {
      dispatch(toInitState());
    } else if (id !== null && id !== "0") {
      dispatch(getModelingsDetails(id));
    }
  }, [id]);

  const details = useSelector((state) => state.modelingsDetails.details);
  console.log(details);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    dispatch(setModelingDetailField({
      fieldName: name,
      fieldValue: name === 'modeling_image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        modeling_name: details.modeling_name,
        modeling_description: details.modeling_description,
        modeling_price: details.modeling_price,
        modeling_image: (typeof(details.modeling_image) === 'object') ? details.modeling_image : null,
        load: details.load,
    };

    if (id !== null && id !== "0") {
        await dispatch(updateModelingDetails(id, data));
        navigate('/modelings/edit');
    } else {
        const resultStatus = await dispatch(createModelings(data));
        if (resultStatus === 0) {
            navigate('/modelings/edit');
        }
    }
  };

  return (
    <div>
      <NavbarAnyMetro showConstructor={true} />
      <Header showCart={false} showApp={true} showConstructor={true} />
      <div className="model-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="model-card-image">
            <img
              src={details.modeling_image === null ? "/mock.jpg" : (typeof(details.modeling_image) === 'object') ? 
                URL.createObjectURL(details.modeling_image) : details.modeling_image}
              alt={details?.modeling_name}
              className="model-detail-card"
            />
            <input className="file-input" type="file" name="modeling_image" onChange={handleChange} accept="image/*" />
          </div>
          <div className="model-card-description">
            <div className="form-field">
                <label htmlFor="modeling_name">Название:</label>
                <input
                  type="text"
                  name="modeling_name"
                  value={details.modeling_name}
                  onChange={handleChange}
                  placeholder="Введите название"
                  className="form-control"
                />
            </div>
            <div className="form-field">
                <label htmlFor="modeling_description">Описание:</label>
                <textarea
                  name="modeling_description"
                  value={details.modeling_description}
                  onChange={handleChange}
                  placeholder="Введите описание"
                  className="description-area form-control"
                />
            </div>
            <div className="form-field">
                <label htmlFor="modeling_price">Цена в рублях:</label>
                <input
                  type="text"
                  name="modeling_price"
                  value={details.modeling_price}
                  onChange={handleChange}
                  placeholder="Введите цену"
                  className="form-control"
                />
            </div>
            <div className="form-field">
                <label htmlFor="load">Загруженность в %:</label>
                <input
                  type="number"
                  name="load"
                  value={details.load}
                  onChange={handleChange}
                  placeholder="Введите загруженность"
                  className="form-control"
                />
            </div>
            <div className="form-field">
                <button className='btn-save' type="submit">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConstructorPage;
