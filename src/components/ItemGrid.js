// 'use client';
// import React from 'react';
// import { FixedSizeGrid as Grid } from 'react-window';
// import { ItemCard } from './ItemCard';

// export default function ItemGrid({ items }) {
//   const COLUMNS = 4;
//   const WIDTH = 280;
//   const HEIGHT = 380;
//   const rows = Math.ceil(items.length / COLUMNS);
  

//   return (
//     <Grid
//       columnCount={COLUMNS}
//       columnWidth={WIDTH}
//       height={window.innerHeight - 100}
//       rowCount={rows}
//       rowHeight={HEIGHT}
//       width={window.innerWidth - 50}
//     >
//       {({ columnIndex, rowIndex, style }) => {
//         const idx = rowIndex * COLUMNS + columnIndex;
//         if (idx >= items.length) return null;
//         return (
//           <div style={style} className="flex justify-center">
//             <ItemCard item={items[idx]} />
//           </div>
//         );
//       }}
//     </Grid>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { ItemCard } from './ItemCard';

export default function ItemGrid({ items }) {
  const COLUMNS = 4;
  const WIDTH = 280;
  const HEIGHT = 380;
  const rows = Math.ceil(items.length / COLUMNS);

  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize(); // Initial call on mount
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // ✅ Don't render Grid until size is known
  if (windowSize.width === null || windowSize.height === null) {
    return <div className="text-center py-10 text-gray-500">Loading layout...</div>;
  }

  return (
    <Grid
      columnCount={COLUMNS}
      columnWidth={WIDTH}
      height={windowSize.height - 100}
      rowCount={rows}
      rowHeight={HEIGHT}
      width={windowSize.width - 50}
    >
      {({ columnIndex, rowIndex, style }) => {
        const idx = rowIndex * COLUMNS + columnIndex;
        if (idx >= items.length) return null;
        return (
          <div style={style} className="flex justify-center">
            <ItemCard item={items[idx]} />
          </div>
        );
      }}
    </Grid>
  );
}
