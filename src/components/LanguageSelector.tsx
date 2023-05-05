import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const  LanguageSelector = () => {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={language}
          onChange={handleChange}
          autoWidth
          label="Language"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>English</MenuItem>
          <MenuItem value={21}>Finnish</MenuItem>
          
        </Select>
      </FormControl>
    </div>
  );
}

export default LanguageSelector;