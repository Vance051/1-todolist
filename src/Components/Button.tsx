import React from 'react';

type ButtonType = {
    name: string
    callBack: () => void
    disabled?:boolean
    classes?:string
}
const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button className={props.classes} onClick={onClickHandler}
        disabled={props.disabled}>
            {props.name}
        </button>
    );
};

export default Button;