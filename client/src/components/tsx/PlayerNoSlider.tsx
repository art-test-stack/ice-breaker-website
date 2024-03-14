import * as React from 'react';

import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
const marks = [
    { value: 1, label: '2 players' },
    { value: 2, label: '3 players' },
    { value: 3, label: '4 players' },
    { value: 4, label: '5 players' },
    { value: 5, label: '6 players' },
    { value: 6, label: '7 players' },
    { value: 7, label: '8 players' },
    { value: 8, label: '10 players' },
    { value: 9, label: '12 players' },
    { value: 10, label: '14 players' },
    { value: 11, label: '16 players' },
    { value: 12, label: '18 players' },
    { value: 13, label: '20 players' },
    { value: 14, label: 'Any' },
];

export let maxPlayers = 21;
export let minPlayers = 2;

export default function PlayerNoSlider() {
    const [value, setValue] = React.useState<number[]>([1, 14]); 

    const handleChange = (event: Event, newValue: number | number[])  => {
        setValue(newValue as number[]); 
        if (Array.isArray(newValue)) {
            minPlayers = controlPlayerValue(newValue[0])
            maxPlayers = controlPlayerValue(newValue[1])
        }
    }; 

    const formatLabel = (value: number) => {
        const mark = marks.find(mark => mark.value === value); 
        return mark ? mark.label : ''; 
    }

    const playerValues = [
        2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 21
    ]; 

    const controlPlayerValue = (sliderValue: number) => {
        return playerValues[sliderValue - 1]; 
    }

    const CustomMark = ({ label }: { label: string }) => {
        return (
            <span style={{ fontSize: '0', position: 'absolute', top: '35px', transform: 'translateX(-50%)' }}>
                {label}
            </span>
        );
    }

  return (
    <Box sx={{ width: "90%"}}>
        {/* 
        add styling:
        font-family: 'Calibri Light', sans-serif;
        font-weight: bold;
        font-size: large;
         */}
        <Typography variant="h6" gutterBottom
        sx={{
            fontFamily: 'Calibri',
            fontWeight: 'bold',
            fontSize: 'large',
            marginLeft: '5px'
        }}
        >
            Select player number:
        </Typography>
        <Slider
            aria-label="Player number slider"
            value = {value}
            onChange={handleChange}
            step={null}
            marks={marks.map(mark => ({ ...mark, label: <CustomMark label={mark.label} /> }))}
            min={1}
            max={14}
            valueLabelDisplay="auto"   
            valueLabelFormat={formatLabel}
            data-cy="playerNumberSlider"
            sx={{
                color: '#7bb3fc',
                '& .MuiSlider-valueLabel': {
                    backgroundColor: '#5375a3',
                    color: 'white',
                    fontFamily: 'Calibri',
                    fontWeight: 'bold',
                    fontSize: 'large'
                },
                '& .MuiSlider-thumb': {
                    backgroundColor: 'white',
                    '&:hover': {
                        boxShadow: '0px 0px 10px 5px #FFA07A'
                    }
                }
            }}
            />
    </Box>
  );
}
