import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { notify } from '../utils/notify';
import { getAuthHeader } from '../utils/getAuthHeader';

const Remove = ({ show, onClose, onRemove, channel }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { id: channel.id, name: channel.name },
    onSubmit: async () => {
      try {
        const response = await axios.delete(`/api/v1/channels/${channel.id}`, {
          headers: getAuthHeader(),
        });
        onRemove(response.data);
        notify(t('infoMessages.removedChannel'));
      } catch (err) {
        if (err.isAxiosError && err.response) {
          notify(t('infoMessages.dataLoadError'), 'error');
        } else if (err.isAxiosError && !err.response) {
          notify(t('infoMessages.networkError'), 'error');
        }
      }
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannelModalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <p className='lead'>{t('channels.confirmationModalDescription')}</p>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' className='me-2' onClick={onClose}>
              {t('buttons.resetButton')}
            </Button>
            <Button variant='danger' type='submit'>
              {t('buttons.removeButton')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
