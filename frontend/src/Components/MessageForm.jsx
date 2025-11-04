import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import * as filter from 'leo-profanity';
import { getAuthHeader } from '../utils/getAuthHeader';
import routes from '../utils/routes';

const MessageForm = ({ channelId, username }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    filter.add(filter.getDictionary('ru'));
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const newMessage = {
        body: filter.clean(values.body),
        channelId,
        username,
      };
      await axios.post(routes.messagesPath(), newMessage, {
        headers: getAuthHeader(),
      });
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
          aria-label={t('messages.newMessage')}
          placeholder={t('messages.inputPlaceholder')}
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
          <span className='visually-hidden'>{t('buttons.sendButton')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
