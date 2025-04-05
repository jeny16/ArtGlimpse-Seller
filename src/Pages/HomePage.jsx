import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Container,
    Paper,
    Stack,
    useTheme,
    Avatar,
    CardMedia,
    Chip
} from '@mui/material';
import {
    PieChartOutlined,
    CurrencyRupee,
    LocalShippingOutlined,
    SupportAgentOutlined,
    ArrowForwardIos,
    WhatsApp,
    Mail,
    Phone
} from '@mui/icons-material';

const HomePage = () => {
    const theme = useTheme();
    const highlight = theme.palette.custom.highlight;

    const styles = {
        hero: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
            color: theme.palette.text.primary,
            padding: theme.spacing(8),
            borderRadius: theme.spacing(1),
            position: 'relative',
            overflow: 'hidden'
        },
        heroContent: {
            position: 'relative',
            zIndex: 2
        },
        section: {
            padding: theme.spacing(10, 0),
        },
        whiteSection: {
            backgroundColor: '#ffffff',
            padding: theme.spacing(10, 0),
        },
        greySection: {
            backgroundColor: '#f5f5f5',
            padding: theme.spacing(10, 0),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: theme.spacing(2),
            boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.12)'
            }
        },
        statsCard: {
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
            textAlign: 'center',
            border: '1px solid #e0e0e0'
        },
        stepCard: {
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
            height: '100%',
            border: '1px solid #e0e0e0'
        },
        button: {
            backgroundColor: highlight,
            color: 'white',
            padding: theme.spacing(1.5, 6),
            borderRadius: theme.spacing(1),
            fontWeight: 600,
            boxShadow: `0 4px 8px ${highlight}33`,
            '&:hover': {
                backgroundColor: highlight,
                boxShadow: `0 6px 10px ${highlight}55`
            }
        },
        secondaryButton: {
            borderColor: highlight,
            color: highlight,
            padding: theme.spacing(1.5, 6),
            borderRadius: theme.spacing(1),
            fontWeight: 600,
            '&:hover': {
                borderColor: highlight,
                backgroundColor: `${highlight}10`
            }
        },
        highlightChip: {
            backgroundColor: highlight,
            color: theme.palette.getContrastText(highlight),
            fontWeight: 600,
            marginBottom: theme.spacing(2)
        },
        stat: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', my: 16 }}>
            {/* Hero Section */}
            <Paper sx={styles.hero} elevation={0}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6} sx={styles.heroContent}>
                            <Chip label="ArtGlimpse Seller" sx={styles.highlightChip} />
                            <Typography variant="h1" gutterBottom fontWeight="700" fontSize="2.8rem">
                                Grow Your Art Business Online
                            </Typography>
                            <Typography variant="h5" paragraph sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
                                Join thousands of artists selling globally on India's premier art marketplace.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button variant="contained" size="large" sx={styles.button} endIcon={<ArrowForwardIos />}>
                                    Register as a Seller
                                </Button>
                                <Button variant="outlined" size="large" sx={styles.secondaryButton}>
                                    Watch Demo
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src="/api/placeholder/550/400"
                                alt="Artist selling artwork online"
                                sx={{
                                    width: '100%',
                                    borderRadius: theme.spacing(3),
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                    transform: 'rotate(2deg)'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* Quick Stats */}
            <Container maxWidth="lg" sx={{ mt: -6 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={styles.statsCard} elevation={0}>
                            <Box sx={styles.stat}>
                                <Typography variant="h3" color={highlight} fontWeight="700">25K+</Typography>
                                <Typography variant="subtitle1">Sellers Trust Us</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={styles.statsCard} elevation={0}>
                            <Box sx={styles.stat}>
                                <Typography variant="h3" color={highlight} fontWeight="700">₹2.5M</Typography>
                                <Typography variant="subtitle1">Monthly Sales Volume</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={styles.statsCard} elevation={0}>
                            <Box sx={styles.stat}>
                                <Typography variant="h3" color={highlight} fontWeight="700">500K+</Typography>
                                <Typography variant="subtitle1">Active Buyers</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Why Sell with ArtGlimpse */}
            <Box sx={styles.whiteSection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Benefits" sx={styles.highlightChip} />
                        <Typography variant="h2" fontWeight="700" gutterBottom>
                            Why Artists Choose ArtGlimpse
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
                            We provide the tools and support you need to grow your art business online.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[200], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <PieChartOutlined sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600">
                                        0% Commission
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Enjoy zero commission for the first 30 days. Competitive rates apply thereafter.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[200], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <CurrencyRupee sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600">
                                        7-Day Payments
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Get faster payouts with our efficient payment cycle.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[200], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <LocalShippingOutlined sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600">
                                        Easy Shipping
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Seamless logistics with door-to-door pickup.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[200], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <SupportAgentOutlined sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600">
                                        24x7 Support
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Dedicated account managers to help your business grow.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How to Get Started */}
            <Box sx={styles.greySection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Quick Start" sx={styles.highlightChip} />
                        <Typography variant="h2" fontWeight="700" gutterBottom>
                            Start Selling in 4 Easy Steps
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
                            Our simple process takes you from registration to your first sale quickly.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { step: '1', title: 'Register & Verify', desc: 'Complete the registration and verify your account.' },
                            { step: '2', title: 'List Your Art', desc: 'Upload your artwork with detailed descriptions.' },
                            { step: '3', title: 'Receive Orders', desc: 'Get notified instantly when customers purchase your artwork' },
                            { step: '4', title: 'Get Paid', desc: 'Receive payments directly in your bank account every 7 days.' }
                        ].map(({ step, title, desc }) => (
                            <Grid key={step} item xs={12} md={6} lg={3}>
                                <Card sx={styles.stepCard} elevation={0}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Avatar sx={{ bgcolor: theme.palette.grey[400], color: 'white', width: 40, height: 40, fontWeight: 'bold' }}>
                                            {step}
                                        </Avatar>
                                        <Typography variant="body2" color="text.secondary" ml={2}>
                                            Step {step}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600">
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={2}>
                                        {desc}
                                    </Typography>
                                    <Box sx={{ height: '6px', width: '40%', backgroundColor: highlight, borderRadius: '3px', mt: 'auto' }} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box mt={8} textAlign="center">
                        <Button variant="contained" size="large" sx={styles.button} endIcon={<ArrowForwardIos />}>
                            Register Now
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Growth Stories */}
            <Box sx={styles.whiteSection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Success Stories" sx={styles.highlightChip} />
                        <Typography variant="h2" fontWeight="700" gutterBottom>
                            Artists Growing with ArtGlimpse
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
                            Real stories from artists who transformed their passion into profitable businesses.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { title: "Aisha's Studio", desc: 'From local sales to global reach, ArtGlimpse transformed my business.', stat: '200% growth in 6 months' },
                            { title: "Raj's Sculptures", desc: 'The nationwide reach helped me find collectors across India.', stat: '75+ cities reached in first year' },
                            { title: "Maya's Paintings", desc: 'Seller tools helped me refine my portfolio and boost my sales.', stat: '₹3.5 lakh monthly sales' }
                        ].map((story, idx) => (
                            <Grid key={idx} item xs={12} md={4}>
                                <Card sx={styles.card} elevation={0}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="/api/placeholder/400/200"
                                        alt="Artist success story"
                                    />
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" gutterBottom fontWeight="600">
                                            {story.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            "{story.desc}"
                                        </Typography>
                                        <Typography variant="body2" fontWeight="600" color={highlight}>
                                            {story.stat}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                padding: theme.spacing(10, 0),
                color: theme.palette.text.primary,
            }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Typography variant="h2" fontWeight="700" gutterBottom>
                            Ready to Transform Your Art Business?
                        </Typography>
                        <Typography variant="subtitle1" paragraph sx={{ opacity: 0.9, mb: 6 }}>
                            Join thousands of artists reaching new customers and growing their sales.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                            <Button variant="contained" size="large" sx={styles.button}>
                                Register as a Seller
                            </Button>
                            <Button variant="outlined" size="large" sx={styles.secondaryButton}>
                                Contact Sales Team
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Support Section */}
            <Box sx={styles.greySection}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Chip label="Seller Support" sx={styles.highlightChip} />
                            <Typography variant="h2" fontWeight="700" gutterBottom>
                                We're Here to Help You Succeed
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary">
                                Our support team is available 24/7 to assist you with any queries.
                            </Typography>
                            <Box mt={4}>
                                <Grid container spacing={3}>
                                    {[
                                        { label: 'WhatsApp Support', icon: <WhatsApp /> },
                                        { label: 'Call Seller Support', icon: <Phone /> },
                                        { label: 'Email Us', icon: <Mail /> }
                                    ].map((btn, idx) => (
                                        <Grid key={idx} item xs={12} sm={6}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={btn.icon}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    p: 2,
                                                    borderColor: '#e0e0e0',
                                                    color: theme.palette.text.primary,
                                                    '&:hover': {
                                                        borderColor: highlight,
                                                        backgroundColor: `${highlight}10`
                                                    }
                                                }}
                                            >
                                                {btn.label}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src="/api/placeholder/550/400"
                                alt="Seller support"
                                sx={{
                                    width: '100%',
                                    borderRadius: theme.spacing(3),
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* FAQ Teaser */}
            <Box sx={{ backgroundColor: '#ffffff', py: 8 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight="700" gutterBottom>
                        Have Questions?
                    </Typography>
                    <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
                        Check our comprehensive seller FAQ or reach out to our support team.
                    </Typography>
                    <Button variant="contained" sx={styles.secondaryButton}>
                        View Seller FAQ
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
