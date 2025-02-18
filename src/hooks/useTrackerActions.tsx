import { TrackerType } from "../contexts/trackerProvider";
import { v4 as uuidv4 } from "uuid"; 

const API_BASE_URL = "http://localhost:5000";

// Ambil semua transaksi dari database JSON
export const fetchTransactions = async () => {
    try {
        const expenses = await (await fetch(`${API_BASE_URL}/expenses`)).json();
        const incomes = await (await fetch(`${API_BASE_URL}/incomes`)).json();
        return [...expenses, ...incomes];
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};

// Tambah transaksi baru dengan ID unik
export const addTransaction = async (transaction: TrackerType) => {
    try {
        const endpoint = transaction.category === "expenses" ? "expenses" : "incomes";
        transaction.id = uuidv4(); // Tambah ID unik

        await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
        });
    } catch (error) {
        console.error("Error adding transaction:", error);
    }
};

// Update transaksi berdasarkan ID
export const updateTransaction = async (transaction: TrackerType) => {
    try {
        const endpoint = transaction.category === "expenses" ? "expenses" : "incomes";

        await fetch(`${API_BASE_URL}/${endpoint}/${transaction.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
        });
    } catch (error) {
        console.error("Error updating transaction:", error);
    }
};

// Hapus transaksi berdasarkan ID
export const deleteTransaction = async (transaction: TrackerType) => {
    try {
        const endpoint = transaction.category === "expenses" ? "expenses" : "incomes";

        await fetch(`${API_BASE_URL}/${endpoint}/${transaction.id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting transaction:", error);
    }
};
