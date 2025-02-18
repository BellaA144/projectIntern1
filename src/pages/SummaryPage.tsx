import { useContext, useState, useMemo } from "react";
import { TrackerContext } from "../contexts/trackerProvider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/summary.css";

const SummaryPage = () => {
    const trackerContext = useContext(TrackerContext);

    if (!trackerContext) {
        return <p>Loading...</p>;
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

    const [selectedRange, setSelectedRange] = useState(30); // Default: 1 bulan

    // Filter & Gabungkan Data Income + Expense
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
    
                // Pastikan entry selalu bertipe Number
                const entry = dataMap.get(t.date);
                if (t.category === "incomes") {
                    entry.income += Number(t.amount);
                } else if (t.category === "expenses") {
                    entry.expense += Number(t.amount);
                }
    
                // Perbarui dataMap dengan entry yang telah diubah
                dataMap.set(t.date, entry);
            });
    
        return Array.from(dataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [tracker, selectedRange]);
    
    console.log("Merged Data:", mergedData);

    // Hitung nilai tertinggi dari income atau expense untuk batas Y-axis
    const maxValue = useMemo(() => {
        return Math.max(...mergedData.map((d) => Math.max(d.income, d.expense)), 100);
    }, [mergedData]);

    // Hitung total pemasukan & pengeluaran
    const totalIncome = mergedData.reduce((sum, item) => sum + Number(item.income), 0);
    const totalExpense = mergedData.reduce((sum, item) => sum + Number(item.expense), 0);

    return (
        <div className="summary-container">
            <div className="summary-time">
                {/* Dropdown Rentang Waktu */}
                <select className="time-range" value={selectedRange} onChange={(e) => setSelectedRange(Number(e.target.value))}>
                    {timeRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                            {range.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="summary-chart">
                {/* Grafik */}
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mergedData}>
                            <XAxis dataKey="date" />
                            <YAxis fontSize={10} domain={[0, maxValue]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="income" stroke="green" name="Income" />
                            <Line type="monotone" dataKey="expense" stroke="red" name="Expense" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <figcaption className="chart-caption">
                    {/* Total Pengeluaran & Pemasukan */}
                    <p>Total Pengeluaran: Rp {totalExpense.toLocaleString("id-ID")}</p>
                    <p>Total Pemasukan: Rp {totalIncome.toLocaleString("id-ID")}</p>
                    <p>Total Keseluruhan: Rp {(totalIncome - totalExpense).toLocaleString("id-ID")}</p>
                </figcaption>
            </div>
        </div>
    );
};

export default SummaryPage;
