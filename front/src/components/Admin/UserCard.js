import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// In accordance with the items styling for the cards
export default function UserCard(props) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="contained">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.userinfo.name} {props.userinfo.surname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
              {props.userinfo.email}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
