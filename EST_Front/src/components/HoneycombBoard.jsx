import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const rows = 4;
const columns = 7;

const HoneycombBoard = () => {
  const champions = useSelector((state) => state.selectedStratUnits);
  const [boardChampions, setBoardChampions] = useState([]);

  

  useEffect(() => {
    setBoardChampions(generateRandomDistribution(champions));
  }, [champions]);

  const generateRandomDistribution = (champions) => {
    const distribution = [];
    const usedPositions = new Set();
    const getRandomPosition = () => {
      let row, col;
      do {
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * columns);
      } while (usedPositions.has(`${row}-${col}`));

      usedPositions.add(`${row}-${col}`);
      return { row, col };
    };

    for (const champion of champions) {
      const { row, col } = getRandomPosition();
      distribution.push({ champion, row, col });
    }

    return distribution;
  };

  const createBoard = () => {
    let board = [];
    for (let row = 0; row < rows; row++) {
      let currentRow = [];
      for (let col = 0; col < columns; col++) {
        const champData = boardChampions.find(champ => champ.row === row && champ.col === col);
        const champion = champData ? champData.champion : null;
        currentRow.push(
          <div key={`${row}-${col}`} className={`hexagon hover:opacity-100 transition-all duration-200 ${champion ? 'opacity-80' : 'opacity-30'}`}>
            {champion ? (
              <img
                src={`https://rerollcdn.com/characters/Skin/11/${champion}.png`}
                alt={`https://rerollcdn.com/characters/Skin/11/${champion}.png`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div> // Hexágono vacío
            )}
          </div>
        );
      }
      board.push(
        <div
          key={row}
          className="flex justify-center"
          style={{
            transform: `translateX(${row % 2 === 0 ? '3%' : '-4%'})`,
          }}
        >
          {currentRow}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="flex flex-col items-center">
      {createBoard()}
    </div>
  );
};

export default HoneycombBoard;
