import { useState } from 'react';

// Lista de nomes de imagens disponíveis
const imagesList = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];

const VotarImagem = () => {
  const [count, setCount] = useState(0);
  const [randomImage, setRandomImage] = useState(imagesList[0]);

  const handleClick = () => {
    setCount(count + 1);
    const randomIndex = Math.floor(Math.random() * imagesList.length);
    setRandomImage(imagesList[randomIndex]);
  }

  return (
    <div>
      <button onClick={handleClick}>Contador</button>
      <p>{count}</p>
      {randomImage && <img src={`/images/${randomImage}`} alt="Imagem Aleatória" />}
      <style jsx>{`
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        button:hover {
          background-color: #45a049;
        }

        p {
          font-size: 24px;
          margin-top: 10px;
        }

        img {
          max-width: 100%;
          height: auto;
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}

export default VotarImagem;
