'use client';
import { toast } from 'react-toastify';

export default function Home() {
    const handleClick = () => {
        toast.info('Este é um toast de teste!');
    };

    return (
        <div>
            <button onClick={handleClick}>Exibir Toast</button>
        </div>
    );
}
