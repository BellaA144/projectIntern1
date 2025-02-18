import { Box, Typography } from "@mui/material";
import useTracker from "../hooks/useTrack";
import Navbar from "./Navbar";

const Header = () => {
    const { tracker } = useTracker();

    // Calculate total expenses and incomes
    const totalExpenses = tracker
        .filter(item => item.category === "expenses")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalIncomes = tracker
        .filter(item => item.category === "incomes")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <Box sx={{ backgroundColor: "#fff", padding: "1em", boxShadow: 2, position: "sticky", top: 0, zIndex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #000", paddingBottom: "0.5em" }}>
                <Typography variant="h4">Expense Tracker</Typography>
                <Box sx={{ textAlign: "right", fontWeight: 600 }}>
                    <Typography variant="body1">
                        <strong>Expenses:</strong> Rp {totalExpenses.toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Incomes:</strong> Rp {totalIncomes.toLocaleString()}
                    </Typography>
                </Box>
            </Box>
            <Navbar />
        </Box>
    );
};

export default Header;
