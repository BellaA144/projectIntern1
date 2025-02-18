import React, { createContext, useState, useEffect, FC } from "react";
import { calculateTotal } from "../utils/helper";

export type TrackerType = {
    id: string;
    date: string;
    category: "expenses" | "incomes"; 
    amount: number;
    description?: string;
};

const getInitialState = (): TrackerType[] => {
    return JSON.parse(localStorage.getItem("trackerData") || "[]");
};

export type TrackerContextType = {
    tracker: TrackerType[];
    totalExpense: number;
    totalIncome: number;
    addTransaction: (transaction: TrackerType) => void;
    removeTransaction: (id: string) => void;
    editTransaction: (id: string, updatedTransaction: TrackerType) => void;
};

export const TrackerContext = createContext<TrackerContextType | undefined>(undefined);
TrackerContext.displayName = "TrackerContext";

export const TrackerProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tracker, setTracker] = useState<TrackerType[]>(getInitialState);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        localStorage.setItem("trackerData", JSON.stringify(tracker));
        updateTotals(); // ✅ Update total setiap ada perubahan
    }, [tracker]);

    const updateTotals = () => {
        const expenseTotal = calculateTotal(tracker, "expenses");
        const incomeTotal = calculateTotal(tracker, "incomes");

        setTotalExpense(expenseTotal);
        setTotalIncome(incomeTotal);
    };

    const addTransaction = (transaction: TrackerType) => {
        setTracker((prev) => [...prev, transaction]);
    };

    const removeTransaction = (id: string) => {
        setTracker((prev) => prev.filter((t) => t.id !== id));
    };

    const editTransaction = (id: string, updatedTransaction: TrackerType) => {
        setTracker((prev) => prev.map((t) => (t.id === id ? updatedTransaction : t)));
    };

    return (
        <TrackerContext.Provider value={{ tracker, totalExpense, totalIncome, addTransaction, removeTransaction, editTransaction }}>
            {children}
        </TrackerContext.Provider>
    );
};

export default TrackerProvider;