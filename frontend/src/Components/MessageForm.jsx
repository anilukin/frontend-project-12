import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { addMessage } from '../Slices/messagesSlice';
import { getAuthHeader } from '../utils/getAuthHeader';

const MessageForm = ({ channelId, username }) => {
  const dispatcher = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const newMessage = {
        body: values.body,
        channelId,
        username,
      };
      const response = await axios.post('/api/v1/messages', newMessage, {
        headers: getAuthHeader(),
      });
      dispatcher(addMessage(response.data));
      formik.resetForm();
      inputRef.current.focus();
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className='py-1 border rounded-2'>
      <Form.Group className='input-group has-validation'>
        <Form.Control
          className='border-0 p-0 ps-2 form-control'
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder='Введите сообщение...'
          name='body'
          id='body'
          autoComplete='body'
          ref={inputRef}
        />
        <Button className='btn btn-group-vertical' type='submit' variant='null'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-arrow-right-square'
          >
            <path
              fillRule='evenodd'
              d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'
            ></path>
          </svg>
          <span className='visually-hidden'>Отправить</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
