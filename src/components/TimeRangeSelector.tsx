import { Select, MenuItem, Box } from "@mui/material";

interface TimeRangeSelectorProps {
    selectedRange: number;
    setSelectedRange: (range: number) => void;
}

const TimeRangeSelector = ({ selectedRange, setSelectedRange }: TimeRangeSelectorProps) => {
    const timeRanges = [
        { label: "1 minggu", value: 7 },
        { label: "1 bulan", value: 30 },
        { label: "3 bulan", value: 90 },
        { label: "6 bulan", value: 180 },
        { label: "1 tahun", value: 365 },
    ];

    return (
        <Box component="div" sx={{ width: '100%', maxWidth: 150, mb: 2, backgroundColor: '#fff' }}>
            <Select
                fullWidth
                value={selectedRange}
                onChange={(e) => setSelectedRange(Number(e.target.value))}>
                {timeRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                        {range.label}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default TimeRangeSelector;
