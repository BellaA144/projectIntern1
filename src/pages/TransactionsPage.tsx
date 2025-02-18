import { useContext, useState } from "react";
import { TrackerContext, TrackerType } from "../contexts/trackerProvider";
import { 
    Container, Typography, TextField, Select, MenuItem, Button, Card, CardContent, 
    List, ListItem, ListItemText, IconButton, FormControl, InputLabel, Paper, Dialog, 
    DialogActions, DialogContent, DialogTitle, Snackbar, Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SelectChangeEvent } from "@mui/material";

const TransactionsPage = () => {
    const trackerContext = useContext(TrackerContext);

    if (!trackerContext) {
        return <Typography>Loading...</Typography>;
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
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: SelectChangeEvent<"expenses" | "incomes">) => {
        setTransaction({ ...transaction, category: e.target.value as "expenses" | "incomes" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!transaction.date || transaction.amount <= 0) {
            alert("Please enter a valid transaction");
            return;
        }

        if (isEditing) {
            editTransaction(transaction.id, transaction);
            setSnackbarMessage("Transaction updated successfully!");
            setSnackbarSeverity("success");
            setIsEditing(false);
        } else {
            addTransaction({ ...transaction, id: Date.now().toString() });
            setSnackbarMessage("Transaction added successfully!");
            setSnackbarSeverity("success");
        }

        setTransaction({ id: "", date: "", category: "expenses", amount: 0, description: "" });
        setOpenSnackbar(true);
    };

    const handleEdit = (transaction: TrackerType) => {
        setTransaction(transaction);
        setIsEditing(true);
    };

    const handleOpenDialog = (transactionId: string) => {
        setSelectedTransactionId(transactionId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTransactionId(null);
    };

    const handleDeleteTransaction = () => {
        if (selectedTransactionId) {
            removeTransaction(selectedTransactionId);
            handleCloseDialog();
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ marginBottom: 2 }}>
                <Typography variant="h4" gutterBottom>{isEditing ? "Edit Transaction" : "Add Transaction"}</Typography>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField 
                                fullWidth 
                                margin="dense"
                                type="date" 
                                name="date" 
                                value={transaction.date} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Category</InputLabel>
                                <Select name="category" value={transaction.category} onChange={handleSelectChange}>
                                    <MenuItem value="expenses">Expense</MenuItem>
                                    <MenuItem value="incomes">Income</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField 
                                fullWidth 
                                margin="dense"
                                type="number" 
                                name="amount" 
                                value={transaction.amount} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <TextField 
                                fullWidth 
                                margin="dense"
                                name="description" 
                                value={transaction.description} 
                                onChange={handleInputChange} 
                                placeholder="Description" 
                            />
                            <Button fullWidth variant="contained" color="primary" type="submit">
                                {isEditing ? "Save Changes" : "Add Transaction"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>

            {tracker.length > 0 && (
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>Transaction List</Typography>
                        <List sx={{ 
                            maxHeight: "25vh", 
                            overflowY: "auto", 
                            overflowX: "hidden" 
                        }}>
                            {tracker
                                .slice()
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                .map((t) => (
                                    <ListItem key={t.id} divider>
                                        <ListItemText 
                                            primary={`${t.date} - ${t.category} - Rp ${t.amount.toLocaleString()} - ${t.description}`} 
                                            sx={{
                                                color: t.category === "incomes" ? "green" : "red", 
                                            }}
                                        />
                                        <IconButton color="primary" onClick={() => handleEdit(t)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleOpenDialog(t.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                        </List>
                    </Paper>
                </Container>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this transaction?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteTransaction} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default TransactionsPage;
