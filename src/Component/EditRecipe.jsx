import '../Styles/EditRecipe.css';
import FormRecipe from './FormRecipe.jsx';

function EditRecipe() {
    
    return (
        <div className='form-content'>
            <FormRecipe onSubmit={handleSubmit} data={recipe} />
        </div>
    );
}

export default EditRecipe;
