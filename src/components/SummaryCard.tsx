import { Paper, Typography } from "@mui/material";

interface SummaryCardProps {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
}

const SummaryCard = ({ totalExpense, totalIncome, totalBalance }: SummaryCardProps) => (
    <Paper elevation={3} sx={{ width: "100%", maxWidth: 600, p: 2, mt: -1, borderRadius: "0 0 8px 8px", margin: "0 auto" }}>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
            Total Pengeluaran: Rp {totalExpense.toLocaleString("id-ID")}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
            Total Pemasukan: Rp {totalIncome.toLocaleString("id-ID")}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
            Total Keseluruhan: Rp {totalBalance.toLocaleString("id-ID")}
        </Typography>
    </Paper>
);

export default SummaryCard;
