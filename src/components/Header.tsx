import Navbar from "./Navbar";
import useTracker from "../hooks/useTrack";

const Header = () => {
    const { tracker } = useTracker();

    // Hitung total expenses dan incomes
    const totalExpenses = tracker
        .filter(item => item.category === "expenses")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalIncomes = tracker
        .filter(item => item.category === "incomes")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <header className="header">
            <div className="header_position">
                <div className="header__title-bar">
                    <h1>Expense Tracker</h1>
                </div>
                <div className="header__tracker">
                    <p><strong>Expenses:</strong> Rp {totalExpenses.toLocaleString()}</p>
                    <p><strong>Incomes:</strong> Rp {totalIncomes.toLocaleString()}</p>
                </div>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;
