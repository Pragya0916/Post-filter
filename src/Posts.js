import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Input } from 'semantic-ui-react'
export default function Posts() {
    const [APIData, setAPIData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("s",e.target.name.value)
        const titleInput = e.target.name.value
        setSearchTerm(titleInput)
        if (searchTerm !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }



    return (
        <div style={{ padding: 20 }}>
            <form onSubmit={handleSubmit}>
            <Input icon='search'
                placeholder='Search...'
                name='name'
            />

            <Button className='mx-2'>Click</Button>
            </form>
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchTerm.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.id}</Card.Header>
                                    <Card.Description>
                                        {item.title}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.id}</Card.Header>
                                    <Card.Description>
                                        {item.title}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                )}
            </Card.Group>
        </div>
    )
}
