import React from 'react';
import { useParams } from 'react-router-dom';

const RequestSingle = () => {
    const params = useParams()
    console.log(params)
    return (
        <div>
            Request Single for _id: 
        </div>
    );
};

export default RequestSingle;