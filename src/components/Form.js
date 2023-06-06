import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';

const Form = (props) => {
    return (
        <Grid container justifyContent='center' sx={{mt: 2, width: '100%'}}>
            <Box sx={{border: '#6495ED solid 1px', borderRadius: '10px', width: '100%', textAlign: 'center'}}>
                {props.children}
            </Box>
        </Grid>
    )
}

export default Form;