import { useFormik } from 'formik';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { getAuthHeader } from '../utils/getAuthHeader';

const Remove = ({ show, onClose, onRemove, channel }) => {
  const formik = useFormik({
    initialValues: { id: channel.id, name: channel.name },
    onSubmit: async () => {
      const response = await axios.delete(`/api/v1/channels/${channel.id}`, {
        headers: getAuthHeader(),
      });
      onRemove(response.data);
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <p className='lead'>Уверены?</p>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' className='me-2' onClick={onClose}>
              Отменить
            </Button>
            <Button variant='danger' type='submit'>
              Удалить
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
