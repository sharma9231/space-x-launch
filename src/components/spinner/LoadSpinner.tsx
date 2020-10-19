import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadSpinner.css';

const LoadSpinner: React.FC<any> = (props: any) => {
    return (
        <Spinner animation="border" role="status" variant="secondary" className={'spinner-size'}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default LoadSpinner;

