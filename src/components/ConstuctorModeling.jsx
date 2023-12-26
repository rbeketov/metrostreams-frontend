import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateModelingDetails, getModelingsDetails, createModelings } from '../actions/modelingsDetailsActions';
import { toInitState } from '../slices/modelingsDetailsSlice.js'
import NavbarAnyMetro from './Navbar';
import Header from './Header';
import { useCustomNavigate } from '../modules/redirect'


const ConstructorPage = () => {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    modeling_name: '',
    modeling_description: '',
    modeling_price: '',
    modeling_image: null, 
    load: null,
  });


  useEffect(() => {
    if (id === "0") {
      setFormData({
        modeling_name: '',
        modeling_description: '',
        modeling_price: '',
        modeling_image: null,
        load: null,
      });
      dispatch(toInitState());
    }
  }, [id]);

  useEffect(() => {
    if (id !== null && id !== "0") {
        dispatch(getModelingsDetails(id));
    }
  }, [id]);

  const details = useSelector((state) => state.modelingsDetails.details);

  useEffect(() => {
    if (details) {
      setFormData({
        modeling_name: details.modeling_name,
        modeling_description: details.modeling_description,
        modeling_price: details.modeling_price,
        modeling_image: details.modeling_image ? details.modeling_image : null,
        load: details.load,
      });
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'modeling_image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        modeling_name: formData.modeling_name,
        modeling_description: formData.modeling_description,
        modeling_price: formData.modeling_price,
        modeling_image: formData.modeling_image,
        load: formData.load,

    }
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
      <NavbarAnyMetro />
      <Header showCart={false} showApp={true} showConstructor={true} />
      <div className="model-card">
        <form onSubmit={handleSubmit}>
          <div className="model-card-image">
            <img
              src={formData.modeling_image === null ? "/mock.jpg" : (typeof(formData.modeling_image) === 'object') ? 
                                            URL.createObjectURL(formData.modeling_image) : formData.modeling_image}
              alt={details?.modeling_name}
              className="model-detail-card"
            />
            <input type="file" name="modeling_image" onChange={handleChange} accept="image/*" />
          </div>
          <div className="model-card-description">
            <input
              type="text"
              name="modeling_name"
              value={formData.modeling_name}
              onChange={handleChange}
              placeholder="Название"
            />
            <textarea
              name="modeling_description"
              value={formData.modeling_description}
              onChange={handleChange}
              placeholder="Описание"
            />
            <input
              type="text"
              name="modeling_price"
              value={formData.modeling_price}
              onChange={handleChange}
              placeholder="Цена"
            />
            <input
              type="number"
              name="load"
              value={formData.load}
              onChange={handleChange}
              placeholder="Загруэенность в %"
            />
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConstructorPage;
