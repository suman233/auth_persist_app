import { GetProfileDetails } from "@/api/functions/user.api";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const Profile = () => {
  const { mutate, data,  } = useMutation({
    mutationFn: GetProfileDetails
  });
  console.log("profile", data);

  return (
    <Container>
      <Typography>Profile Details</Typography>
      <Box>
        <Paper>
          <Typography>{"Suman Kundu"}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
