import React from 'react';
import Traits from './Traits.jsx';

import { stars, levels } from '../champions/stars';
import gold from '../images/gold.webp';

// Array de campeones con información adicional
const champions = [
    {
        name: 'Annie',
        image: 'https://rerollcdn.com/characters/Skin/11/Annie.png',
        stars: 4,
        price: 4,
        level: 1,
        traits: [
            {
                name: 'Mage',
                image: 'https://rerollcdn.com/icons/mage.png'
            },
        ],
        attackRange: '3',
        ability: {
            name: 'Orb of Deception',
            description: 'Annie sends out and pulls back her orb, dealing magic damage on the way out and true damage on the way back.',
            manaCost: 50,
            image: 'https://rerollcdn.com/abilities/11/azir-blight.png'
        }
    },
    {
        name: 'Lux',
        image: 'https://rerollcdn.com/characters/Skin/11/Lux.png',
        stars: 2,
        price: 1,
        level: 2,
        traits: [
            {
                name: 'Glacial',
                image: 'https://rerollcdn.com/icons/glacial.png'
            },
            {
                name: 'Berserker',
                image: 'https://rerollcdn.com/icons/berserker.png'
            }
        ],
        attackRange: '1',
        ability: {
            name: 'Ragnarok',
            description: 'Olaf gains attack speed and lifesteal, becoming immune to crowd control.',
            manaCost: 70,
            image: 'https://rerollcdn.com/abilities/11/azir-blight.png'
        }
    },
    {
        name: 'Azir',
        image: 'https://rerollcdn.com/characters/Skin/11/Azir.png',
        stars: 5,
        price: 5,
        level: 3,
        traits: [
            {
                name: 'Dryad',
                image: 'https://rerollcdn.com/icons/dryad.png'
            },
            {
                name: 'Invoker',
                image: 'https://rerollcdn.com/icons/invoker.png'
            }
        ],
        attackRange: '1',
        ability: {
            name: 'Ragnarok',
            description: 'Olaf gains attack speed and lifesteal, becoming immune to crowd control.',
            manaCost: 70,
            image: 'https://rerollcdn.com/abilities/11/azir-blight.png'
        }
    },
];

export default function TeamComp() {
    const emptySpaces = Array.from({ length: 10 - champions.length });

    return (
        <div className="bg-[#272727] text-white rounded-lg py-6 px-8 ">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
                {champions.map(champion => (
                    <div key={champion.name} className="relative text-center justify-center items-center w-[80px] mx-auto group opacity-80 hover:opacity-100 transition-all duration-150">
                        <div className="text-xs rounded px-1 mb-1" style={{ color: levels[champion.level] }}>
                            {Array.from({ length: champion.level }).map((_, index) => (
                                <span key={index}> ★ </span>
                            ))}
                        </div>

                        <div className="hexagon group relative rounded-md p-[2px]" style={{ backgroundColor: stars[champion.stars] }}>
                            <img src={champion.image} alt={champion.name} className="rounded-md w-full h-auto mx-auto" />
                        </div>
                    </div>
                ))}
                {emptySpaces.map((_, index) => (
                    <div key={index} className="w-[80px] h-[80px] bg-transparent"></div>
                ))}
            </div>
            <Traits />
        </div>
    );
}
