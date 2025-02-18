import { useContext, useState, useMemo } from "react";
import { TrackerContext } from "../contexts/trackerProvider";
import { Box } from "@mui/material";
import { Typography } from "@mui/material"; 
import TimeRangeSelector from "../components/TimeRangeSelector";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import SummaryCard from "../components/SummaryCard";

const SummaryPage = () => {
    const trackerContext = useContext(TrackerContext);

    if (!trackerContext) {
        return <Typography>Loading...</Typography>;
    }

    const { tracker } = trackerContext;

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
            <TimeRangeSelector selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
            <IncomeExpenseChart mergedData={mergedData} maxValue={maxValue} />
            <SummaryCard totalExpense={totalExpense} totalIncome={totalIncome} totalBalance={totalBalance} />
        </Box>
    );
};

export default SummaryPage;