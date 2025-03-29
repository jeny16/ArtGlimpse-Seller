import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Checkbox,
    FormControlLabel,
    Alert,
    Stack
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
// import { DeleteAccount } from '../../store/sellerSlice'; // Assuming this exists

const DeleteAccount = () => {
    const [checked, setChecked] = useState(false);
    const auth = useSelector((state) => state.auth);
    const userId = auth?.userData?.userId || auth?.userData?._id;
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (!userId) {
            alert('You must be logged in to delete your account.');
            return;
        }
        try {
            await dispatch(DeleteAccount({ userId })).unwrap();
            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.error('Delete error:', error);
            alert(error || 'Failed to delete seller account');
        }
    };

    const handleKeepAccount = () => {
        window.history.back();
    };

    const deleteConsequences = [
        "All your listed products will be removed from the platform.",
        "You will lose access to your sales history and revenue analytics.",
        "Pending payouts and transactions will be canceled.",
        "To sell again, you’ll need to re-register and verify your business identity.",
        "Some financial data may be retained for legal and auditing purposes."
    ];

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: 700,
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
            }}
        >
            <Box
                sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    py: 3,
                    px: 4,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Delete Seller Account
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Permanently remove your business and data from ArtGlimpse
                </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
                <Alert
                    severity="warning"
                    sx={{
                        mb: 3,
                        bgcolor: 'error.lighter',
                        color: 'error.dark'
                    }}
                >
                    <Typography variant="body2">
                        This action is <strong>permanent</strong> and cannot be undone. Please make sure you've backed up your data.
                    </Typography>
                </Alert>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    Deleting your seller account will have the following consequences:
                </Typography>

                <Stack spacing={2} sx={{ mb: 3 }}>
                    {deleteConsequences.map((point, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    bgcolor: 'error.lighter',
                                    color: 'error.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                {index + 1}
                            </Box>
                            <Typography variant="body2">{point}</Typography>
                        </Box>
                    ))}
                </Stack>

                <Box
                    sx={{
                        bgcolor: 'error.lighter',
                        p: 2,
                        borderRadius: 2,
                        mb: 3
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                color="error"
                            />
                        }
                        label="I confirm I want to permanently delete my seller account"
                    />
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                    Need help before deleting? <a href="/contact-support">Contact Seller Support</a>
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleKeepAccount}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            borderRadius: 2,
                            fontWeight: '600',
                            borderColor: 'error.main',
                            color: 'error.main',
                            '&:hover': {
                                backgroundColor: 'rgba(211, 47, 47, 0.05)',
                                borderColor: 'error.main'
                            }
                        }}
                    >
                        Keep My Account
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={!checked}
                        startIcon={<WarningAmberIcon />}
                        sx={{
                            borderRadius: 2,
                            fontWeight: '600',
                            '&:disabled': {
                                backgroundColor: 'error.light',
                                opacity: 0.6
                            }
                        }}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default DeleteAccount;
