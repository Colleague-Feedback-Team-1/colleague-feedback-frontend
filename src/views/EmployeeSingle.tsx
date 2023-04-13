import React from 'react';
import { useParams } from 'react-router-dom';
import { Employee } from '../types/types';

const EmployeeSingle = (props: any) => {
    // need an endpoint to fetch a single employee by id
    const params = useParams();
    console.log(params.employeeId)
    return (
        <div>
            Employee single page
        </div>
    );
};

export default EmployeeSingle;