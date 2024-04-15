'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function Home() {
    const [dados_usuario, set_dados_usuario] = useState({
        id_usuario: '',
        nome_usuario: '',
        email: '',
        paroquia_capela: '',
        votou: ''
    })
    const handleClick = () => {
        toast.info('Este é um toast de teste!');
    };

    useEffect(() => {
        const id_usuario = Cookies.get('id_usuario');
        const nome_usuario = Cookies.get('nome_usuario');
        const email = Cookies.get('email');
        const paroquia_capela = Cookies.get('paroquia_capela');
        const votou = Cookies.get('votou');

        if (id_usuario && nome_usuario && email && paroquia_capela && votou) {
            set_dados_usuario({
                id_usuario: id_usuario,
                nome_usuario: nome_usuario,
                email: email,
                paroquia_capela: paroquia_capela,
                votou: votou
            })
        }
    }, [])

    return (
        <div>
            <button onClick={handleClick}>Exibir Toast</button>
        </div>
    );
}
