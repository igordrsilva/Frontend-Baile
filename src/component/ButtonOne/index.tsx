import React from "react";

interface ButtonOneProps {
    text?: string;
    className?: string;
    onClick?: () => void;
    icone?: any;
}

const ButtonOne: React.FC<ButtonOneProps> = ({ onClick, text, icone, className }) => {

    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
        >
            <span>{icone}</span>
            {text}
        </button>
    );
};

export default ButtonOne;
