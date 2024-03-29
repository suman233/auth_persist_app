/* eslint-disable no-console */

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { logout } from "@/reduxtoolkit/slices/userSlice";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

import { HeaderWrap } from "@/styles/StyledComponents/HeaderWrapper";
import CartIcon from "@/ui/Icons/cartIcon";
import Badge from "@mui/material/Badge";
import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { GetProfileDetails } from "@/api/functions/user.api";

// const CustomButton = dynamic(() => import("@/ui/Buttons/CustomButton"));

const drawerWidth = 240;

export default function Header() {
  const navItems = [
    {
      name: "Clinical studies",
      route: "javascript:void(0)"
    },
    {
      name: "The science",
      route: "javascript:void(0)"
    },
    {
      name: "Shop",
      route: "/shop"
    },
    {
      name: "Contact us",
      route: "javascript:void(0)"
    }
  ];

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { userData, isLoggedIn } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
    toast.success("Logged out successfully");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link href={item?.route} key={item.name}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  //for adding class to header while scroll
  // const [scroll, setScroll] = React.useState(false);

  // const detectScroll = React.useCallback(() => {
  //   setScroll(window.scrollY > 100);
  // }, []);
  // const { isLoading, data } = useQuery({
  //   queryKey: ["profiledetails"],
  //   queryFn: GetProfileDetails
  // });
  // console.log("profile", data);
  const usertoken = getCookie("token");
  // console.log("urtoken", usertoken);

  React.useEffect(() => {
    setIsLoggedIn(!!usertoken);
  }, [usertoken]);


  return (
    <HeaderWrap sx={{ display: "flex" }} className="main_head">
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        className="headerContainer"
      >
        <Container fixed>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" className="headerLogo">
              <Image src={assest.logo_img} width={250} height={38} alt="Logo" />
            </Link>
            {loggedIn ? (
              <>
                {/* <Box
                  sx={{ display: { xs: "none", sm: "block" } }}
                  className="navbar"
                >
                  <CustomButtonPrimary
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={()=>router.push('/profile')}
                  >
                    <span>User</span>
                  </CustomButtonPrimary>
                </Box> */}
                <Box
                  sx={{ display: { xs: "none", sm: "block" } }}
                  className="navbar"
                  >
                  <CustomButtonPrimary
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={()=>router.push('/profile')}
                  >
                    <span>{userData?.data?.first_name}</span>
                  </CustomButtonPrimary>
                </Box>
              </>
            ) : (
              <Box
                sx={{ display: { xs: "none", sm: "block" } }}
                className="navbar"
              >
                {navItems.map((item) => (
                  <Link
                    href={item?.route}
                    key={item?.route}
                    className={router.pathname === item.route ? "active" : ""}
                  >
                    {/* <CustomButton type="button" variant="text"> */}
                    {item?.name}
                    {/* </CustomButton> */}
                  </Link>
                ))}
              </Box>
            )}
            <Box className="hdr_rgt">
              <Box className="cart_icon">
                <Badge color="primary" variant="dot">
                  <CartIcon />
                </Badge>
              </Box>
              {!loggedIn ? (
                <CustomButtonPrimary
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <Typography onClick={() => router.push("/auth/login")}>
                    Login
                  </Typography>
                </CustomButtonPrimary>
              ) : (
                <>
                  <Typography></Typography>
                  <CustomButtonPrimary
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    <Typography onClick={() => handleLogout()}>
                      Logout
                    </Typography>
                  </CustomButtonPrimary>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </HeaderWrap>
  );
}
