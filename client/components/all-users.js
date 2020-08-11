import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/all-users'

import {
  Grid,
  withStyles,
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

//Material UI styling
import styles from '../admin-styles'

const tableColumns = [
  {id: 'id', label: 'ID', minWidth: 60},
  {id: 'name', label: 'NAME', minWidth: 200},
  {id: 'email', label: 'EMAIL', minWidth: 150},
]

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {classes} = this.props
    let users = this.props.users

    return (
      <div
        style={{
          backgroundImage: `url("../resources/assets/img/all_v2.jpg")`,
          marginBottom: '-5000x',
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          style={{
            paddingTop: '150px',
            paddingBottom: '100px',
          }}
        >
          <Paper elevation={3}>
            <Box p={5}>
              <Grid container direction="row">
                <Grid item>
                  <Typography variant="h5" style={{fontWeight: 100}}>
                    ALL USERS
                  </Typography>

                  <TableContainer style={{padding: '20px'}}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {tableColumns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.itemText}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {users.map((user) => {
                          return (
                            <TableRow key={user.id}>
                              {tableColumns.map((column) => {
                                const value = user[column.id]
                                return (
                                  <TableCell
                                    key={user.id + column.id}
                                    className={classes.itemText}
                                  >
                                    {column.id === 'price'
                                      ? '$ ' + value
                                      : value}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchAllUsers()),
  }
}

AllUsers.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapState, mapDispatch)(withStyles(styles)(AllUsers))
