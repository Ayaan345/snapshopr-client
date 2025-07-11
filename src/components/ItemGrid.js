// 'use client';
// import React, { useState, useEffect } from 'react';
// import { FixedSizeGrid as Grid } from 'react-window';
// import { ItemCard } from './ItemCard';

// export default function ItemGrid({ items }) {
//   const COLUMNS = 4;
//   const WIDTH = 280;
//   const HEIGHT = 380;
//   const rows = Math.ceil(items.length / COLUMNS);

//   const [windowSize, setWindowSize] = useState({
//     width: null,
//     height: null,
//   });

//   useEffect(() => {
//     const updateSize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     updateSize(); // Initial call on mount
//     window.addEventListener('resize', updateSize);

//     return () => window.removeEventListener('resize', updateSize);
//   }, []);

//   //  Don't render Grid until size is known
//   if (windowSize.width === null || windowSize.height === null) {
//     return <div className="text-center py-10 text-gray-500">Loading layout...</div>;
//   }

//   return (
//     <Grid
//       columnCount={COLUMNS}
//       columnWidth={WIDTH}
//       height={windowSize.height - 100}
//       rowCount={rows}
//       rowHeight={HEIGHT}
//       width={windowSize.width - 50}
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


// ItemGrid.js
'use client';
import React, { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { ItemCard } from './ItemCard';

export default function ItemGrid({ items }) {
  // Dynamic column and size calculation based on window width
  const [gridConfig, setGridConfig] = useState({
    columnCount: 4,
    columnWidth: 280,
    rowHeight: 380,
    gridWidth: 0,
    gridHeight: 0,
  });

  const calculateGridConfig = (windowWidth, windowHeight) => {
    let columnCount;
    let columnWidth;
    let rowHeight = 320; // Default row height, adjust as needed for content

    if (windowWidth < 640) { // Extra small screens
      columnCount = 1;
    } else if (windowWidth < 1024) { // Small to medium screens
      columnCount = 2;
    } else { // Large screens
      columnCount = 3;
    }

    // Calculate columnWidth based on available width and desired padding/gap
    // Assuming 16px (4 units of Tailwind's 'gap-4') for horizontal padding on each side for the grid container
    const totalHorizontalPadding = 32; // (p-8 on main in page.js = 32px padding left/right)
    const gap = 24; // gap-6 in ProductSection.js

    columnWidth = (windowWidth - totalHorizontalPadding - (columnCount - 1) * gap) / columnCount;

    setGridConfig({
      columnCount: columnCount,
      columnWidth: columnWidth,
      rowHeight: rowHeight,
      gridWidth: windowWidth - totalHorizontalPadding, // Main width minus padding
      gridHeight: windowHeight - 200, // Adjust this value based on header/footer height and any other vertical padding
    });
  };

  useEffect(() => {
    const updateSize = () => {
      calculateGridConfig(window.innerWidth, window.innerHeight);
    };

    // Initial call and event listener
    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const rows = Math.ceil(items.length / gridConfig.columnCount);

  // Don't render Grid until sizes are known
  if (gridConfig.gridWidth === 0 || gridConfig.gridHeight === 0) {
    return <div className="text-center py-10 text-gray-500">Loading layout...</div>;
  }

  return (
    <Grid
      columnCount={gridConfig.columnCount}
      columnWidth={gridConfig.columnWidth}
      height={gridConfig.gridHeight}
      rowCount={rows}
      rowHeight={gridConfig.rowHeight}
      width={gridConfig.gridWidth}
      itemData={items} // Pass items as itemData for access in inner render
    >
      {({ columnIndex, rowIndex, style, data }) => {
        const item = data[rowIndex * gridConfig.columnCount + columnIndex];
        if (!item) return null; // No item at this index

        return (
          <div style={style} className="flex justify-center p-3"> {/* Added padding to space out items */}
            <ItemCard item={item} />
          </div>
        );
      }}
    </Grid>
  );
}
