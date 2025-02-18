import { Box, Typography } from "@mui/material";

const Footer = () => {
    const year: number = new Date().getFullYear();

    return (
        <Box sx={{ backgroundColor: "#fff", padding: "1em", textAlign: "baseline" }}>
            <Typography variant="body1">
                Made by bel &copy; {year}
            </Typography>
        </Box>
    );
};

export default Footer;
