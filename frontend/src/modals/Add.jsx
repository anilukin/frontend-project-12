import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  FormLabel,
} from 'react-bootstrap';
import validationSchema from '../utils/channelValidationSchema';
import { getAuthHeader } from '../utils/getAuthHeader';

const Add = ({ show, onClose, onAdd }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelNames = useSelector((state) => state.channels.channels).map(
    (ch) => ch.name.trim()
  );

  const formik = useFormik({
    initialValues: { id: '', name: '' },
    validationSchema: validationSchema(channelNames),
    onSubmit: async (values) => {
      const newChannel = {
        name: values.name.trim(),
      };
      const response = await axios.post('/api/v1/channels', newChannel, {
        headers: getAuthHeader(),
      });
      onAdd(response.data);
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className='form-group mb-2'>
            <FormControl
              name='name'
              id='name'
              required
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <FormLabel className='visually-hidden' htmlFor='name'>
              Имя канала
            </FormLabel>
            {formik.touched.name && formik.errors.name && (
              <div className='invalid-feedback'>{formik.errors.name}</div>
            )}
          </FormGroup>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' className='me-2' onClick={onClose}>
              Отменить
            </Button>
            <Button
              variant='primary'
              type='submit'
              disabled={formik.isSubmitting}
            >
              Отправить
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
