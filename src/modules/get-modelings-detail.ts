export interface ModelingsDetails {
    modeling_id: number;
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_image: string;
}

export const getModelingsDetail = async (id: number): Promise<ModelingsDetails> => {
    return fetch(`http://localhost:8000/modelings/${id}/`, {
        method: 'GET',
        }) 
        .then((response) => response.json())
        .catch(() => ([]));
}
