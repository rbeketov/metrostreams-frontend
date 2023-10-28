export interface Modelings {
    modeling_id: number;
    modeling_name: string;
    modeling_description: string;
    modeling_price: string;
    modeling_url: string;
}

export interface ModelingsResult {
    results: Modelings[];
}

export const getModelings = async (name = ''): Promise<ModelingsResult> => {
    return fetch(`/modelings/?name=${name}`)
        .then((response) => response.json())
        .catch(() => ({ results: [] }));
}
