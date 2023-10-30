export interface Modelings {
    modeling_id: number;
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_image: string;
}

export const getModelings = async (name = '', minPrice=0, maxPrce=99000): Promise<Modelings[]> => {
    return fetch(`http://localhost:8000/modelings/?name=${name}&price_under=${minPrice}&price_upper=${maxPrce}`, {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch(() => ([]));
}
