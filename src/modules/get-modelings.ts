export interface Modelings {
    modeling_id: number;
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_image: string;
}

export const getModelings = async (name = ''): Promise<Modelings[]> => {
    return fetch(`http://localhost:8000/modelings/?name=${name}`, {
        headers: {
          'Origin': 'http://localhost:3000',
          'Access-Control-Allow-Origin': '3000',
        }})
        .then((response) => response.json())
        .catch(() => ([]));
}
