import { useContext, useState } from "react";
import { TrackerContext, TrackerType } from "../contexts/trackerProvider";
import "../styles/transactions.css";

const TransactionsPage = () => {
    const trackerContext = useContext(TrackerContext);

    if (!trackerContext) {
        return <p>Loading...</p>;
    }

    const { tracker, addTransaction, removeTransaction, editTransaction } = trackerContext;

    const [transaction, setTransaction] = useState<TrackerType>({
        id: "",
        date: "",
        category: "expenses",
        amount: 0,
        description: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!transaction.date || transaction.amount <= 0) {
            alert("Please enter a valid transaction");
            return;
        }

        if (isEditing) {
            editTransaction(transaction.id, transaction);
            setIsEditing(false);
        } else {
            addTransaction({ ...transaction, id: Date.now().toString() });
        }

        setTransaction({ id: "", date: "", category: "expenses", amount: 0, description: "" });
    };

    const handleEdit = (transaction: TrackerType) => {
        setTransaction(transaction);
        setIsEditing(true);
    };

    return (
        <div className="transactions-page">
            <div className="transactions-container">
                <h2>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>
                <form className="transactions-form" onSubmit={handleSubmit}>
                    <input type="date" name="date" value={transaction.date} onChange={handleChange} required />
                    <select name="category" value={transaction.category} onChange={handleChange}>
                        <option value="expenses">Expense</option>
                        <option value="incomes">Income</option>
                    </select>
                    <input type="number" name="amount" value={transaction.amount} onChange={handleChange} required />
                    <input type="text" name="description" value={transaction.description} onChange={handleChange} placeholder="Description" />
                    <button type="submit">{isEditing ? "Save Changes" : "Add Transaction"}</button>
                </form>
            </div>

            {tracker.length > 0 && (
                <div className="transactions-list-container">
                    <h3>Transaction List</h3>
                    <ul className="transactions-list">
                        {tracker
                            .slice()
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Urutkan berdasarkan tanggal
                            .map((t) => (
                                <li key={t.id}>
                                    <p>{t.date} - {t.category} - Rp {t.amount.toLocaleString()} - {t.description}</p>
                                    <button className="edit-button" onClick={() => handleEdit(t)}>Edit</button>
                                    <button className="delete-button" onClick={() => removeTransaction(t.id)}>Delete</button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
