import { FC } from 'react'
import { Card } from 'react-bootstrap'
import './ModelCard.css'

interface Modelings {
    modeling_id: number
    modeling_name: string
    modeling_description: string
    modeling_price: string
    modeling_url: string
}

const ModelingsCard: FC<Modelings> = ({ modeling_id, modeling_name, modeling_description, modeling_price, modeling_url }) => (
    <Card className="card">
        <Card.Img className="cardImage" variant="top" src="/logo.phg" height={100} width={100}  />
        <Card.Body>                
            <div className="textStyle">
                <Card.Title>{modeling_name}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {modeling_id}
                    {modeling_description}
                    {modeling_price}
                </Card.Text>
            </div>
        </Card.Body>
    </Card>
)

export default ModelingsCard;