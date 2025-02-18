import { TrackerType } from "../contexts/trackerProvider";

export const calculateTotal = (tracker: TrackerType[], category: "expenses" | "incomes") => {
    return tracker
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + Number(t.amount), 0);
};
