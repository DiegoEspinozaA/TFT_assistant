import React from 'react';
import { useSelector } from 'react-redux';
import traitsData from '../data/traits.js';

export default function Traits() {
    const champions = useSelector((state) => state.selectedStratUnits);
    
    // Calcula la cantidad de cada rasgo basado en los campeones seleccionados
    const traitCounts = champions.reduce((acc, champion) => {
        champion.traits.forEach(trait => {
            if (!acc[trait.name]) {
                acc[trait.name] = {
                    ...trait,
                    count: 0
                };
            }
            acc[trait.name].count += 1;
        });
        return acc;
    }, {});

    // Convertir el objeto de conteos a un array y ordenarlo de mayor a menor
    const sortedTraits = Object.values(traitCounts).sort((a, b) => b.count - a.count);

    return (
        <div className="mt-6">
            <div className="flex flex-wrap justify-center gap-2 text-xs items-center">
                {sortedTraits.map(trait => (
                    <div key={trait.name} className="flex items-center gap-2 py-1 px-3 rounded-full bg-zinc-900">
                        <img src={trait.image} alt={trait.name} className="w-3 h-3" />
                        <span>{trait.name}</span>
                        <span>{trait.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
