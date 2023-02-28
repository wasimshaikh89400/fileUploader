import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import { useRouter } from "next/router";
export const MainListItems = () => {
  const router = useRouter();
  const mainList = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => router.push("/homepage"),
    },
    {
      label: "Orders",
      icon: <ShoppingCartIcon />,
    },
    {
      label: "Customers",
      icon: <PeopleIcon />,
    },
    {
      label: "Reports",
      icon: <LayersIcon />,
    },
  ];
  return (
    <>
      {mainList.length > 0 &&
        mainList.map((element, index) => {
          return (
            <ListItemButton key={index} onClick={element?.onClick}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.label} />
            </ListItemButton>
          );
        })}
    </>
  );
};
