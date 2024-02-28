import { GetProfileDetails } from '@/api/functions/user.api';
import { Box, Container, Paper, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import React from 'react'

export const Profile = () => {
    const { mutate, data, error } = useMutation({
        mutationFn: GetProfileDetails
      });

  return (
    <Container>
        <Typography>Profile Details</Typography>
        <Box>
            <Paper>
                <Typography>{JSON.parse(data?.data.data.first_name)}</Typography>
            </Paper>
        </Box>
    </Container>
  )
}
