import { Typography, Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

const FormIntro = () => {
  return (
    <Box mb={3}>
      <Typography variant="body1" paragraph>
        We collect colleague feedback yearly. This is an essential tool for developing as a
        professional for all of us, so please fill this form carefully. Especially open comments are
        very appreciated.
      </Typography>
      <Typography variant="h6">A few reminders:</Typography>
      <List>
        <ListItem disablePadding>
          <ListItemText primary="1) You are also evaluating your competence manager with the same form. When evaluating, please consider him/her first and foremost as a manager, not through his/her specialist role. You can see the role from the preselected 'You are providing this feedback as' -question." />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="2) Project Managers are evaluating all the employees working in client projects, and are doing the evaluation from the client perspective. Remember that a PM can also be asked to give feedback as a colleague. You can see the role from the preselected 'You are providing this feedback as' -question." />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="3) We have a new grading system. Please read the guide on grading carefully." />
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        If you haven't worked with the person in question at all, don't start guessing. Notify HR /
        CTO to find another respondent - and remember that suggestions of a more suitable respondent
        are always welcome. Don't forward the email to anyone yourself.
      </Typography>
      <Typography variant="body1" paragraph>
        Please notice that although your feedback will be anonymous, your open comments containing
        any identifying information (such as project-specific data) might be recognizable. We won't
        actively dig up who might have answered to whom, nor do we ever reveal that information to
        anyone.
      </Typography>
    </Box>
  )
}

export default FormIntro
