const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  itemText: {
    fontSize: '.9em',
    fontWeight: 100,
  },
})

export default styles
