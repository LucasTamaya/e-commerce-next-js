import Link from "next/link";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ListItemText } from "@mui/material";

interface Props {
  window?: () => Window;
}

interface INavItems {
  title: string;
  href?: string;
  onClick?: () => void;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const [navItems, setNavItems] = useState<INavItems[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [cookie, _, removeCookie] = useCookies(["userId"]);

  const router = useRouter();

  const handleSignOut = () => {
    removeCookie("userId", { path: "/" });
    router.push("/");
  };

  const BASIC_NAV_ITEMS = [
    { title: "Best Foods", href: "/" },
    { title: "Burgers", href: "/burgers" },
    { title: "Pizzas", href: "/pizzas" },
    { title: "Desserts", href: "/desserts" },
  ];
  const notAuthNavItems = [
    ...BASIC_NAV_ITEMS,
    { title: "Sign-in", href: "/sign-in" },
  ];
  const authNavItems = [
    ...BASIC_NAV_ITEMS,
    { title: "Cart", href: "/cart" },
    { title: "Sign-out", onClick: handleSignOut },
  ];

  useEffect(() => {
    // if no cookie
    if (cookie.userId === undefined) {
      setNavItems(notAuthNavItems);
      // if cookie
    } else {
      setNavItems(authNavItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie.userId, removeCookie]);

  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // layout on small screen
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2 }}
        className="text-main-red font-bold"
      >
        NextFoodApp
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {item.href ? (
                <Link href={item.href} className="text-center">
                  {item.title}
                </Link>
              ) : (
                <ListItemText primary={item.title} onClick={item.onClick} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // layout on large screen
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "#e63b60" }}
        className="px-10 py-3"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h3"
            component="div"
            sx={{
              flexGrow: 1,
              display: { md: "block" },
              fontSize: 35,
              textAlign: { xs: "center", md: "initial" },
            }}
          >
            NextFoodApp
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.title} sx={{ color: "#fff" }}>
                {item.href ? (
                  <Link href={item.href}>{item.title}</Link>
                ) : (
                  <p onClick={item.onClick}>{item.title}</p>
                )}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
}
