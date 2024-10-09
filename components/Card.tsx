import React from 'react';

interface CardProps {
    title: string;
    image: string;
    price: number
    formattedPrice: string
}

const Card = ({ title, image, formattedPrice }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-[240px] object-cover" src={image} alt={title} />
            <div className="px-6 py-4 flex justify-between items-center">
                <div className="text-lg">{title}</div>
                <p>{formattedPrice}</p>
            </div>
        </div>
    );
};

export default Card;
