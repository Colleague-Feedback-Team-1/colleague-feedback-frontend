import { Typography, Box, List, ListItem, ListItemText } from '@mui/material'

const FormIntro = () => {
  return (
    <Box mb={3} textAlign="left" sx={{ margin: '0 6rem' }}>
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
      <Typography variant="h6">Grading guidance</Typography>
      <Typography variant="body1" paragraph>
        Consider the person’s performance as compared to your expectations.
        The scale is as follows 1-5:
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemText primary="1) Performing fully below your expectations in this area" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="2) Performing partially under your expectations in this area" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="3) Performing on the expected level in this area. This means there’s “nothing to complain” and you are content with the performance in this area." />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="4) The performance is exceeding expectations partially in this area. This means in your view the person doing more than you think is rightly expected on the job type or level the person is currently working on." />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="5) The performance is exceeding your expectations fully in this area. This means the person is performing on the next level and thus should be promoted to a higher level or to a more demanding role." />
        </ListItem>
      </List>
    </Box>
  )
}

export default FormIntro
