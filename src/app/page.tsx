/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { Slide, toast } from 'react-toastify';
import RootLayout from './layout';
import Cookies from 'js-cookie';

export default function Home() {
  const [email, setEmail] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [paroquiaCapela, setParoquiaCapela] = useState('');
  const [vazio, SetVazio] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getInitial = async () => {
      const response = await fetch(
        `${process.env.BASE_URL}/usuario`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    };
    getInitial();
  })

  const handleSalvarImagem = async () => {
    if (!email || !nomeUsuario || !paroquiaCapela) {
      SetVazio(true);
      toast.info('Todos os campos devem ser preenchidos!');
    } else {
      SetVazio(false);
      const json = {
        nome_usuario: nomeUsuario,
        email: email,
        paroquia_capela: paroquiaCapela
      };

      console.log(json);
      console.log(`${process.env.BASE_URL}/usuario`);

      try {
        const response = await fetch(
          `${process.env.BASE_URL}/usuario`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome_usuario: nomeUsuario,
              email: email,
              paroquia_capela: paroquiaCapela
            })
          }
        );
        if (response.ok) {
          toast.success('Enviado com sucesso!');
          const fetchedData = await response.json();
          Cookies.set('id_usuario', fetchedData.id_usuario, { expires: 1 / 48 });
          Cookies.set('nome_usuario', fetchedData.nome_usuario, { expires: 1 / 48 });
          Cookies.set('email', fetchedData.email, { expires: 1 / 48 });
          Cookies.set('paroquia_capela', fetchedData.paroquia_capela, { expires: 1 / 48 });
          Cookies.set('votou', fetchedData.votou, { expires: 1 / 48 });
          // add um timer de 1.5s
          router.push('/votar');
        } else {
          toast.error('Erro no envio!');
        }
      } catch (error) {
        toast.error('Erro no envio!');
        console.log(JSON.stringify(json));
        console.error('Error fetching data:', error);
      }
    }
  }

  return (
    <div className="h-full bg-stone-200 flex justify-center items-center">
      <div className="w-full flex flex-wrap justify-center items-center">

        <div className="w-4/5 flex flex-wrap justify-center">
          <img src="clj.png" alt="logo-clj" className="h-auto w-auto max-h-32" />
        </div>

        <div className="w-4/5 flex flex-wrap justify-center">
          <h1 className="font-medium text-3xl text-zinc-800 ">Preencha seus dados básicos</h1>
        </div>

        <div className="w-4/5 flex flex-wrap justify-center">
          <div className="flex flex-wrap justify-center mt-4 w-full text-zinc-800">
            <input className="bg-stone-400 w-4/5 px-4 py-1 rounded-lg text-zinc-800 font-medium outline-none placeholder:text-zinc-600 placeholder:text-center text-center placeholder:font-normal" type="text" name="email" id="email" placeholder="Email" onChange={(e: any) => {
              SetVazio(false)
              setEmail(e.target.value);
            }} />
          </div>

          <div className="flex flex-wrap justify-center mt-4 w-full text-zinc-800">
            <input className="bg-stone-400 w-4/5 px-4 py-1 rounded-lg text-zinc-800 font-medium outline-none placeholder:text-zinc-600 placeholder:text-center placeholder:font-normal text-center" type="text" name="nome" id="nome" placeholder="Nome Completo" onChange={(e: any) => {
              SetVazio(false)
              setNomeUsuario(e.target.value);
            }} />
          </div>

          <div className="flex flex-wrap justify-center mt-4 w-full text-zinc-800">
            <input className="bg-stone-400 w-4/5 px-4 py-1 rounded-lg text-zinc-800 font-medium outline-none placeholder:text-zinc-600 placeholder:text-center text-center placeholder:font-normal" type="text" name="paroquia-capela" id="paroquia-capela" placeholder="Paróquia/Capela - Cidade" onChange={(e: any) => {
              SetVazio(false)
              setParoquiaCapela(e.target.value);
            }} />
          </div>
          <div className="flex flex-wrap justify-center mt-2 w-4/5 text-sm font-medium">
            <p className={vazio ? "text-red-600" : "text-zinc-600"}>{vazio ? 'Todos os campos devem ser preenchidos!' : 'Colocar o nome da paróquia/capela completo!'}</p>
          </div>


          <div className="flex flex-wrap justify-center w-full ">
            <button className="bg-zinc-800 hover:bg-zinc-700 rounded-xl my-4 font-medium text-white px-8 py-2" name="descricao-imagem" id="descricao-imagem" onClick={handleSalvarImagem}>
              Enviar
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}
