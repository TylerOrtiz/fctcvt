'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import LinkGenerator from '@/utility/links'

export default function Navigation({ window }) {
    const drawerWidth = 240;
    const navItems = [
        {
            label: 'Shows',
            location: LinkGenerator.showsLink()
        },
        {
            label: 'Posts',
            location: LinkGenerator.postsLink(),
        },
        {
            label: 'About', location: '/about',
        },
        {
            label: 'Board', location: '/board',
        },
    ]

    const container = window !== undefined ? () => window().document.body : undefined;

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                <ListItem key="home" disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} href="/">
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                {navItems.map((item) => (
                    <ListItem key={item.location} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} href={item.location}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar component="nav" position="fixed" sx={{ zIndex: 2000}} >
                <Container maxWidth="lg" disableGutters={true} >
                    <Toolbar disableGutters={true}>
                        <Button
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <Image src="/logo.webp" alt="fctc logo" width={75} height={75} />
                        </Button>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                            <Box sx={{ display: 'inline-flex', marginRight: '1rem' }}>
                                <Link href="/">
                                    <Image src="/logo.webp" alt="fctc logo" width={100} height={100} style={{ display: 'inline-flex' }} />
                                </Link>
                            </Box>
                            <Box sx={{ display: 'inline-block', marginLeft: '1rem' }}>
                                {navItems.map((item) => (
                                    <Button color='primary' key={item.location} href={item.location}>
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Toolbar>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '85px' },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Container>
            </AppBar>
        </>
    )
}
