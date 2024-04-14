/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';

const UploadImagem = () => {
    const [imagem, setImagem] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

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
    };

    return (
        <div className={previewImage ? '' : "flex justify-normal"} >
            <h2>Pré-visualização da Imagem:</h2>
            <div className='flex justify-normal'>

                {previewImage && (
                    <div>
                        <img
                            src={previewImage}
                            alt="Imagem Selecionada"
                            className="border-2 rounded-lg border-zinc-800 w-80 h-80"
                        />
                    </div>
                )}
                <input
                    type="file"
                    name="imageUpload"
                    id="imageUpload"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    value={'Testando'}
                />
            </div>
            <div className="w-80 h-80 border-2 border-gray-800 rounded-xl flex justify-center items-center">

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
        </div>
    );
};

export default UploadImagem;
