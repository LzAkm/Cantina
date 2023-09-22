import React, { useState } from 'react';
import '../Styles/AddRecipeForm.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormRecipe from './FormRecipe.jsx';

function AddRecipeForm() {
    
    return (
        <div className='form-content'>
            <FormRecipe />
            {/* <FormRecipe onSubmit={handleSubmit} data={recipe} /> */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
}

export default AddRecipeForm;
