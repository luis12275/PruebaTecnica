import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { withRouter } from 'react-router-dom'

const MenuHamburguesa = (props) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
      setIsDrawerOpen(open);
      console.log('los datos es ', open)
    };
  
    const menuItems = ["Usuarios", ""];
  
    const opcionMenu=(opcion)=>{
        console.log('los datos es ', opcion)
        props.history.push('/'+opcion)
        window.location.reload();
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* AppBar */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { sm: "none" } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Título o Logo */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Prueba Técnica
                    </Typography>

                    {/* Menú para pantallas grandes */}
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {menuItems.map((item) => (
                            <Button key={item} color="inherit" onClick={()=>opcionMenu(item)}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer (Menú lateral) */}
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {menuItems.map((item) => (
                            <ListItem button key={item}>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};
export default withRouter(MenuHamburguesa)