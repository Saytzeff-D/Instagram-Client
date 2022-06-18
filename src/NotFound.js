import React from 'react';
import Footer from './Footer';

function NotFound(props) {
    return (
        <div>
            <div>
                <p className='text-center h2'>Sorry, this page isn't available.</p>
                <p className='text-center'>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
            </div>
            <Footer/>
        </div>
    );
}

export default NotFound;