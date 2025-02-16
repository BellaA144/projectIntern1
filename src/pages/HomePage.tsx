import { useContext, useMemo } from "react";
import { TrackerContext } from "../contexts/trackerProvider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "../styles/homepage.css";

const HomePage = () => {
    const trackerContext = useContext(TrackerContext);

    if (!trackerContext) {
        return <p>Loading...</p>;
    }

    const { tracker } = trackerContext;

    // **Ambil transaksi dalam 7 hari terakhir**
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentTransactions = tracker.filter(
        (t) => new Date(t.date) >= oneWeekAgo
    );

    // **Pisahkan income & expense, lalu urutkan berdasarkan tanggal**
    const expenseData = useMemo(() =>
        recentTransactions
            .filter(t => t.category === "expenses")
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), 
        [recentTransactions]
    );

    const incomeData = useMemo(() =>
        recentTransactions
            .filter(t => t.category === "incomes")
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), 
        [recentTransactions]
    );

    // **Hitung total income & expense dalam 7 hari terakhir**
    const totalExpense = expenseData.reduce((sum: number, item) => sum + Number(item.amount), 0);
    const totalIncome = incomeData.reduce((sum: number, item) => sum + Number(item.amount), 0);

    // **Hitung nilai tertinggi untuk Y-axis**
    const maxExpense = Math.max(...expenseData.map((d) => d.amount), 100);
    const maxIncome = Math.max(...incomeData.map((d) => d.amount), 100);

    const pieData = [
        { name: "Expenses", value: totalExpense },
        { name: "Income", value: totalIncome },
    ];

    const COLORS = ["#FF5733", "#28A745"];
    const percentage = totalIncome === 0 ? 0 : ((totalIncome - totalExpense) / totalIncome) * 100;
    const resultText = percentage >= 0 ? "Pemasukan lebih besar" : "Pengeluaran lebih besar";

    return (
        <div className="homepage-container">    
            <main className="main-content">
                <div className="grid-container">
                    {/* Expense Box */}
                    <div className="card">
                        <h2>Pengeluaran</h2>
                        <ResponsiveContainer width="100%" height={150}>
                            <LineChart data={expenseData}>
                                <XAxis fontSize={10} dataKey="date" />
                                <YAxis fontSize={10} domain={[0, maxExpense]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#FF5733" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p>Total Pengeluaran: Rp {totalExpense.toLocaleString("id-ID")}</p>
                    </div>
    
                    {/* Income Box */}
                    <div className="card">
                        <h2>Pemasukan</h2>
                        <ResponsiveContainer width="100%" height={150}>
                            <LineChart data={incomeData}>
                                <XAxis fontSize={10} dataKey="date" />
                                <YAxis fontSize={10} domain={[0, maxIncome]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#28A745" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p>Total Pemasukan: Rp {totalIncome.toLocaleString("id-ID")}</p>
                    </div>
    
                    {/* Total Result Box */}
                    <div className="card">
                        <h2>Keseluruhan</h2>
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
                        <p>{resultText} ({percentage.toFixed(2)}%)</p>
                    </div>
                </div>
            </main>
        </div>
    );    
};

export default HomePage;
