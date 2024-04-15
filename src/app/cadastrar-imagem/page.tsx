/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { Slide, toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function Home() {
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [imagem, setImagem] = useState('');
  const [descricaoImagem, setDescricaoImagem] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dadosUsuario, setDadosUsuario] = useState({
    id_usuario: '',
    nome_usuario: '',
    email: '',
    paroquia_capela: '',
    votou: ''
  });

  useEffect(() => {
    const id_usuario = Cookies.get('id_usuario');
    const nome_usuario = Cookies.get('nome_usuario');
    const email = Cookies.get('email');
    const paroquia_capela = Cookies.get('paroquia_capela');
    const votou = Cookies.get('votou');

    if (id_usuario && nome_usuario && email && paroquia_capela && votou) {
      setDadosUsuario({
        id_usuario: id_usuario,
        nome_usuario: nome_usuario,
        email: email,
        paroquia_capela: paroquia_capela,
        votou: votou
      });
    }
  }, []);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setImagem(base64Image.split(',')[1]);
        setPreviewImage(base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo PNG ou JPEG válido.');
    }
    setImagemCarregada(true);
  };

  const handleImageUploadClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleSalvarImagem = async () => {
    const json = {
      upload_imagem: imagem,
      descricao_imagem: descricaoImagem,
      id_usuario: 2
    };

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/imagem`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            upload_imagem: imagem,
            descricao_imagem: descricaoImagem,
            id_usuario: 2
          })
        }
      );
      if (response.ok) {
        toast.success('Salvo com sucesso!', {
          position: 'bottom-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: <IoCheckmark size={25} />,
          theme: 'light',
          transition: Slide
        });
        const fetchedData = await response.json();
        console.log(fetchedData);
        console.log('Post imagem concluído!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  }

  return (
    <div className="h-full bg-stone-200">

      <div className="mx-auto bg-zinc-800 flex justify-center">
        <div className="w-4/5 flex justify-between items-center py-6">
          <div className="w-full flex items-center text-white justify-between">
            <div className="flex">
              <a href="/cadastrar-imagem" className="flex items-center font-normal hover:text-gray-300 ml-10 text-xl tracking-tight">
                Cadastrar Fantasia
              </a>
              <a href="/votar" className="flex items-center font-normal hover:text-gray-300 ml-10 text-xl tracking-tight">
                Votar
              </a>
            </div>
            <div className="flex justify-normal items-center">
              <CgProfile size={25} />
              <p className="font-normal text-xl ml-2">{dadosUsuario.nome_usuario}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-auto pb-8 mt-10 flex justify-center">
        <div className="w-4/5 flex flex-wrap justify-center">
          <h1 className="font-medium text-3xl text-gray-800 ">Vamos inscrever sua fantasia no voto popular?</h1>
        </div>
      </div>

      <div className="h-auto flex justify-center">
        <div className="w-4/5 flex flex-wrap justify-center">
          {previewImage ? (
            <div className="w-full flex flex-wrap justify-center">
              <div className="flex flex-wrap justify-center w-full">
                <img
                  src={previewImage}
                  alt="Imagem Selecionada"
                  className="rounded-lg w-80 h-80"
                />
              </div>

              <div className="flex flex-wrap justify-center mt-4 w-full text-zinc-800">
                <input className="bg-stone-400 w-2/5 px-4 py-1 rounded-lg text-zinc-800 font-medium outline-none placeholder:text-zinc-600 placeholder:text-center text-center placeholder:font-normal" type="text" name="descricao-imagem" id="descricao-imagem" placeholder="Descrição da imagem" onChange={(e: any) => {
                  setDescricaoImagem(e.target.value);
                }} />
              </div>

              <div className="flex flex-wrap justify-center mt-4 w-full ">
                <button className="bg-zinc-800 hover:bg-zinc-700 rounded-xl my-4 font-medium text-white px-8 py-2" name="descricao-imagem" id="descricao-imagem" onClick={handleSalvarImagem}>
                  Salvar
                </button>
              </div>

            </div>
          ) : (
            <div className="w-80 h-80 border-2 border-gray-800 rounded-xl flex justify-center items-center cursor-pointer" onClick={handleImageUploadClick}>
              <input
                ref={inputFileRef}
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">Carregar imagem</p>
                <div className="flex justify-center">
                  <div>
                    <p className="text-base font-normal text-gray-800">Clique e selecione</p>
                    <div className="flex justify-center text-gray-800">
                      <MdOutlineDriveFolderUpload className="mt-2" size={50} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
