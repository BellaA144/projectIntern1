import { useMemo } from "react";
import { useTracker } from "../hooks/useTrack"; // Mengimpor custom hook
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { groupTransactionsByDate } from "../utils/groupTransactions"; // Impor fungsi utilitas

const HomePage = () => {
    const theme = useTheme();
    const { tracker } = useTracker(); // Hanya mengambil tracker

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Menentukan tanggal 7 hari yang lalu

    // Menyaring transaksi yang terjadi dalam satu minggu terakhir
    const recentTransactions = tracker.filter(
        (t) => new Date(t.date) >= oneWeekAgo
    );

    // Menggunakan useMemo untuk data pengeluaran
    const expenseData = useMemo(() => 
        groupTransactionsByDate(recentTransactions, "expenses"),
        [recentTransactions]
    );

    // Menggunakan useMemo untuk data pemasukan
    const incomeData = useMemo(() => 
        groupTransactionsByDate(recentTransactions, "incomes"),
        [recentTransactions]
    );

    // Menghitung total pengeluaran dan pemasukan dalam satu minggu terakhir
    const totalExpense = useMemo(() => 
        expenseData.reduce((sum, t) => sum + t.expense, 0),
        [expenseData]
    );

    const totalIncome = useMemo(() => 
        incomeData.reduce((sum, t) => sum + t.income, 0),
        [incomeData]
    );

    // Menentukan nilai maksimum pengeluaran dan pemasukan
    const maxExpense = Math.max(...expenseData.map((d) => d.expense), 100);
    const maxIncome = Math.max(...incomeData.map((d) => d.income), 100);

    // Data untuk grafik pie
    const pieData = [
        { name: "Expenses", value: totalExpense },
        { name: "Income", value: totalIncome },
    ];

    const COLORS = [theme.palette.error.main, theme.palette.success.main];
    const percentage = totalIncome === 0 ? 0 : ((totalIncome - totalExpense) / totalIncome) * 100;
    const resultText = percentage >= 0 ? "Pemasukan lebih besar" : "Pengeluaran lebih besar";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
            <Grid container spacing={3} maxWidth={1200}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Pengeluaran</Typography>
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={expenseData}>
                                    <XAxis fontSize={10} dataKey="date" />
                                    <YAxis fontSize={10} domain={[0, maxExpense]} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="expense" stroke={theme.palette.error.main} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                            <Typography>Total Pengeluaran: Rp {totalExpense.toLocaleString("id-ID")}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Pemasukan</Typography>
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={incomeData}>
                                    <XAxis fontSize={10} dataKey="date" />
                                    <YAxis fontSize={10} domain={[0, maxIncome]} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="income" stroke={theme.palette.success.main} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                            <Typography>Total Pemasukan: Rp {totalIncome.toLocaleString("id-ID")}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Keseluruhan</Typography>
                            <ResponsiveContainer width="100%" height={150}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={50}>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} name={entry.name} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <Typography>{resultText} ({percentage.toFixed(2)}%)</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;
