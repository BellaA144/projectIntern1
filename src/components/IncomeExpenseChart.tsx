import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Definisikan tipe untuk props
interface IncomeExpenseData {
    date: string;
    income: number;
    expense: number;
}

interface IncomeExpenseChartProps {
    mergedData: IncomeExpenseData[];
    maxValue: number;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ mergedData, maxValue }) => {
    const theme = useTheme();

    return (
        <Paper sx={{ width: "100%", maxWidth: 600, p: 2, borderRadius: "8px 8px 0 0", margin: "0 auto" }}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mergedData}>
                    <XAxis
                        dataKey="date"
                        tickFormatter={(str) => new Date(str).toLocaleDateString()}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, maxValue]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="income" stroke={theme.palette.success.main} name="Pemasukan" />
                    <Line type="monotone" dataKey="expense" stroke={theme.palette.error.main} name="Pengeluaran" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default IncomeExpenseChart;
