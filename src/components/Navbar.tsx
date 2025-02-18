import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
    const theme = useTheme();

    return (
        <Box
            className="navbar"
            sx={{
                marginTop: "0.5em",
                textAlign: "right",
            }}
        >
            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "1em",
                    fontSize: "1.3em",
                }}
            >
                <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: "bold",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Home
                        </Typography>
                    </Link>
                </li>
                <li>
                    <Link to="/transactions" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: "bold",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Transactions
                        </Typography>
                    </Link>
                </li>
                <li>
                    <Link to="/summary" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: "bold",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Summary
                        </Typography>
                    </Link>
                </li>
            </ul>
        </Box>
    );
};

export default Navbar;
