import './Button.css';

function Button (props) {

    return (
        <button
            className='button accent'> {props.name} </button>
    )
}

export default Button;