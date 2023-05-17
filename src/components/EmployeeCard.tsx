import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

interface EmployeeCardProp {
  _id?: string
  employeeid?: string
  employeeName: string
  employeeEmail: string
  selfReview?: boolean | null
}

const EmployeeCard = (prop: EmployeeCardProp) => {
  const renderCardAction = (prop: EmployeeCardProp) => {
    if (prop.selfReview === undefined) {
      return null
    } else if (prop.selfReview) {
      return (
        <IconButton>
          <CheckCircleIcon color="success" />
        </IconButton>
      )
    } else {
      return (
        <IconButton>
          <CancelIcon color="error" />
        </IconButton>
      )
    }
  }
  return (
    <Card sx={{ width: '300px', height: '70px', margin: '10px' }}>
      <Link to={`/employees/${prop.employeeid}`}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: '#fcb900' }}>{prop.employeeName.slice(0, 1)}</Avatar>}
          title={prop.employeeName}
          subheader={`${prop.employeeEmail.slice(0, 15)}...`}
          action={renderCardAction({ ...prop })}
        />
      </Link>
    </Card>
  )
}

export default EmployeeCard
