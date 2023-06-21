import React, {useState, useRef} from 'react';
import axios from 'axios';
import Logo from './Logo';
import Form from './Form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

const MainContainer = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);
    const isSubmitDisabled = subject.trim() === '' || body.trim() === '' || isSubmitBtnClicked;
    let link = useRef('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);

    const handleSubmit = () => {
        setIsSubmitBtnClicked(true);
        setBackDropOpen(true);
        axios.post(process.env.REACT_APP_API_URL + 'message/save', {
            subject: subject,
            body: body
        })
        .then(res => {
            if (res.status === 200 && res.data && res.data.sts === 1) {
                link.current = res.data.linkId;
                setErrorMessage('');
                setIsFormSubmitted(true);
            } else {
                setErrorSnackBarOpen(true);
                setErrorMessage('Something went wrong');
            }
        }).catch(res => {
            setIsFormSubmitted(true);
            setErrorMessage('Something went wrong');
        })
    }

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    }

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handleBackDropClose = () => {
        setBackDropOpen(false);
    }

    const onErrorSnackBarClose = () => {
        setErrorSnackBarOpen(false);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(prepareMessageLink(link.current));
        setLinkCopied(true);
    }

    const prepareMessageLink = (linkId) => {
        return process.env.REACT_APP_APP_URL + 'message/' + linkId;
    }

    const handleNewMessage = () => {
        setIsFormSubmitted(false);
        setBackDropOpen(false);
        setErrorSnackBarOpen(false);
        setErrorMessage('');
        setSubject('');
        setBody('');
        setIsSubmitBtnClicked(false);
        setLinkCopied(false);
    }

    return (
        <React.Fragment>
            <Logo/>
            {!isFormSubmitted ? (<Form>
                <TextField id="subject" label="Subject" variant="outlined" sx={{mt: 2, mx: '2%', width: '96%'}} onChange={(event) => {handleSubjectChange(event)}} value={subject}/>
                <TextField multiline rows={10} id="body" label="Body" variant="outlined" sx={{mt: 2, mx: '2%', width: '96%'}} onChange={(event) => {handleBodyChange(event)}} value={body}/>
                <Button variant="contained" sx={{my: 2}} onClick={handleSubmit} disabled={isSubmitDisabled}>Generate Link</Button>
                {isSubmitBtnClicked && <Backdrop
                    sx={{ color: '#fff', zIndex: 100 }}
                    open={backDropOpen}
                    onClick={handleBackDropClose}
                >
                <CircularProgress color="inherit" />
                </Backdrop>}
                <Snackbar open={errorSnackBarOpen} autoHideDuration={6000} onClose={onErrorSnackBarClose}>
                    <Alert severity="error" sx={{ width: '100%' }} variant="filled">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Form>) : (
                <Form>
                    <TextField size="small" id="linkField" variant="outlined" sx={{my: '2%', ml: '2%', mr: '1%', width: '80%'}} readOnly={true} value={prepareMessageLink(link.current)} InputProps={{readOnly: true}}/>
                    <Button variant="contained" sx={{mt: '2%', ml: '1%', mr: '2%', width: '14%'}} startIcon={linkCopied ? <DoneIcon/> : <ContentCopyIcon />} onClick={handleCopy} >{linkCopied ? 'Copied' : 'Copy'}</Button>
                    <Button variant="contained" color="success" sx={{mb: '2%', mx: 'auto'}} onClick={handleNewMessage}>Compose New Message</Button>
                </Form>
            )}
            
        </React.Fragment>

    )
}

export default MainContainer;