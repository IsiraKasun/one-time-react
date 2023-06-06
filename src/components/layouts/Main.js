import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import MainContainer from '../MainContainer';
const Main = (props) => {
    return (
        <Grid container spacing={2} direction="row" justifyContent='center' alignItems='center' sx={{height: '100vh', width: '100vw', textAlign: 'center'}}>
            <Grid md={2} sx={{display: {xs: 'none', md: 'flex'}}}>
                <Box></Box>
            </Grid>
            <Grid md={8} xs={12}>
                <Box sx={{width: '100%'}}><MainContainer/></Box>
            </Grid>
            <Grid md={2} sx={{display: {xs: 'none', md: 'flex'}}}>
                <Box></Box>
            </Grid>
        </Grid>
    )
}


export default Main;