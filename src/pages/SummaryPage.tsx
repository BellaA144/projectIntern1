import { useContext, useState, useMemo } from "react";
import { TrackerContext } from "../contexts/trackerProvider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Select, MenuItem, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SummaryPage = () => {
    const trackerContext = useContext(TrackerContext);
    const theme = useTheme();

    if (!trackerContext) {
        return <Typography>Loading...</Typography>;
    }

    const { tracker } = trackerContext;

    // Pilihan rentang waktu
    const timeRanges = [
        { label: "1 minggu", value: 7 },
        { label: "1 bulan", value: 30 },
        { label: "3 bulan", value: 90 },
        { label: "6 bulan", value: 180 },
        { label: "1 tahun", value: 365 },
    ];

    const [selectedRange, setSelectedRange] = useState(30);

    const mergedData = useMemo(() => {
        const now = new Date();
        const dataMap = new Map();

        tracker
            .filter((t) => {
                const transactionDate = new Date(t.date);
                const diffInDays = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));
                return diffInDays <= selectedRange;
            })
            .forEach((t) => {
                if (!dataMap.has(t.date)) {
                    dataMap.set(t.date, { date: t.date, income: 0, expense: 0 });
                }

                const entry = dataMap.get(t.date);
                if (t.category === "incomes") {
                    entry.income += Number(t.amount);
                } else if (t.category === "expenses") {
                    entry.expense += Number(t.amount);
                }

                dataMap.set(t.date, entry);
            });

        return Array.from(dataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [tracker, selectedRange]);

    const maxValue = useMemo(() => {
        return Math.max(...mergedData.map((d) => Math.max(d.income, d.expense)), 100);
    }, [mergedData]);

    const totalIncome = useMemo(() => 
        mergedData.reduce((sum, item) => sum + Number(item.income), 0),
        [mergedData]
    );

    const totalExpense = useMemo(() => 
        mergedData.reduce((sum, item) => sum + Number(item.expense), 0),
        [mergedData]
    );

    const totalBalance = totalIncome - totalExpense;

    return (
        <Box display="flex" flexDirection="column" p={2}>
            <Box component="div" sx={{ width: '100%', maxWidth: 150, mb: 2, backgroundColor: '#fff' }}>
                <Select
                    fullWidth
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(Number(e.target.value))}>
                    {timeRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                        {range.label}
                    </MenuItem>
                    ))}
                </Select>
            </Box>

            <Paper elevation={3} sx={{ width: "100%", maxWidth: 600, p: 2, borderRadius: "8px 8px 0 0", margin: "0 auto" }}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mergedData}>
                        <XAxis 
                            dataKey="date" 
                            tickFormatter={(str) => new Date(str).toLocaleDateString()} 
                            tick={{ fontSize: 12 }} 
                        />
                        <YAxis domain={[0, maxValue]} tick={{ fontSize: 14 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="income" stroke={theme.palette.success.main} name="Pemasukan" />
                        <Line type="monotone" dataKey="expense" stroke={theme.palette.error.main} name="Pengeluaran" />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

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
        </Box>
    );
};

export default SummaryPage;
