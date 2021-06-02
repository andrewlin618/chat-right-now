import React from "react";
import { Box, Badge } from "@material-ui/core";

const BadgeUnread = (props) => {
    // const classes = useStyles();
    const { counter } = props;

    return (
        <Box>
            <Badge badgeContent={counter} color="primary"></Badge>
        </Box>
    );
};

export default BadgeUnread;
