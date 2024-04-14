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
            className={`${className} border-2 border-zinc-600 rounded-md text-zinc-600 font-medium bg-transparent w-auto flex items-center hover:bg-stone-300`}
            type="button"
            onClick={onClick}
        >
            <span className="mr-2">{icone}</span>
            {text}
        </button>
    );
};

export default ButtonOne;
