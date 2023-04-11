import { Stack, InputBase, IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    return (
      <Stack
        direction={"row"}
        style={{ backgroundColor: "white" }}
        alignItems={"center"} 
        justifyContent={'center'}
        width={'350px'}
      >
        <InputBase
          placeholder="Search…"
          style={{
            padding: "8px 12px",
            width: "100%",
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton aria-label="search" style={{ padding: 8 }}>
          <SearchIcon />
        </IconButton>
      </Stack>
    );
};

export default SearchBar;