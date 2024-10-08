import React from 'react';

interface CardProps {
    title: string;
    image: string;
}

const Card = ({ title, image }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-[240px] object-cover" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="text-center text-xl mb-2">{title}</div>
            </div>
        </div>
    );
};

export default Card;
