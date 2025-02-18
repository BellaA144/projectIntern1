export type TransactionGrouped = {
    date: string;
    income: number;
    expense: number;
};

export const groupTransactionsByDate = (transactions: any[], category: string): TransactionGrouped[] => {
    const groupedTransactions = transactions
        .filter(t => t.category === category)
        .reduce<Record<string, TransactionGrouped>>((acc, t) => {
            const date = t.date;
            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }
            if (category === "expenses") {
                acc[date].expense += Number(t.amount);
            } else if (category === "incomes") {
                acc[date].income += Number(t.amount);
            }
            return acc;
        }, {});

    return Object.values(groupedTransactions).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};