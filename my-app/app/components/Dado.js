import Image from 'next/image';

export default function Dado({ valor }) {
  // Se o valor for 0, mostra um espaço vazio ou texto
  if (valor === 0) return <div style={{ border: '1px solid #ccc', width: '50px', height: '50px', display: 'inline-block' }}>?</div>;

const nomesImagens = {
    1: "dice",
    2: "dois",
    3: "tres",
    4: "quatro",
    5: "cinco",
    6: "seis"
}

const nomeArquivo = nomesImagens[valor];

  return (
    <div style={{ display: 'inline-block', margin: '5px' }}>
      <Image 
        src={`/dados/${nomeArquivo}.png`} 
        alt={`Dado ${valor}`}
        width={50}
        height={50}
      />
    </div>
  );
}