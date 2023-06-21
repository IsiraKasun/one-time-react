import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const MessageContainer = () => {
    const {linkId} = useParams();
    const [messageViewed, setMessageViewed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [msg, setMsg] = useState({subject: '', body: ''})

    useEffect(() => {
        if (!messageViewed) {
            axios.get(process.env.REACT_APP_API_URL + 'message/' + linkId)
            .then(res => {
                if (res.status === 200 && res.data && res.data.sts === 1) {
                    setMsg({subject: res.data.msg.subject, body: res.data.msg.body});
                    setMessageViewed(false);
                    setErrorMessage('');
                } else if (res.status === 200 && res.data && res.data.sts === 2) {
                    setMessageViewed(true)
                    setErrorMessage('This message has already been opened once!!!');
                }
            }).catch(res => {
                setMessageViewed(true)
                setErrorMessage('This message has already been opened once!!!');
            })
        }
    }, []);
    
    return (
        <Form>
            {!messageViewed ? (
                <>
                    <Typography variant="h5" sx={{fontWeight: 600}}>{msg.subject}</Typography>
                    <Typography variant="p" sx={{fontWeight: 400}}>{msg.body}</Typography>
                </>
            ) : (
                <Typography variant="h5" sx={{fontWeight: 600, color: 'red'}}>{errorMessage}</Typography>
            )}
            
        </Form>
        // <Form>        <Typography variant="h5" sx={{fontWeight: 600, color: 'red'}}>{errorMessage}</Typography></Form>

    )
}


export default MessageContainer;