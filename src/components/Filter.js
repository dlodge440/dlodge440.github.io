// src/components/Filter.js
import React from 'react';
import { Slider, Box, Typography } from '@mui/material';

const Filter = ({ deteriorationRange, setDeteriorationRange }) => {
  const handleChange = (event, newValue) => {
    setDeteriorationRange(newValue);
  };

  return (
    <Box marginY={2}>
      <Typography gutterBottom>Deterioramento</Typography>
      <Slider
        value={deteriorationRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={100} // Modifica max a 100 per rappresentare la percentuale
        marks={[
          { value: 0, label: '0%' },
          { value: 100, label: '100%' }, // Aggiunta etichetta 100%
        ]}
      />
    </Box>
  );
};

export default Filter;
