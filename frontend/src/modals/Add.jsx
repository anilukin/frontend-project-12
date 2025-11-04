import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  FormLabel,
} from 'react-bootstrap'
import * as filter from 'leo-profanity'
import { notify } from '../utils/notify'
import validationSchema from '../utils/channelValidationSchema'
import { getAuthHeader } from '../utils/getAuthHeader'
import routes from '../utils/routes'

const Add = ({ show, onClose, onAdd }) => {
  const { t } = useTranslation()
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
    filter.add(filter.getDictionary('ru'))
  }, [])

  const channelNames = useSelector(state => state.channels.channels).map(
    ch => ch.name.trim(),
  )

  const formik = useFormik({
    initialValues: { id: '', name: '' },
    validationSchema: validationSchema(channelNames, t),
    onSubmit: async values => {
      try {
        const newChannel = {
          name: filter.clean(values.name.trim()),
        }
        const response = await axios.post(routes.channelsPath(), newChannel, {
          headers: getAuthHeader(),
        })
        onAdd(response.data)
        notify(t('infoMessages.addedChannel'))
      } catch (err) {
        if (err.isAxiosError && err.response) {
          notify(t('infoMessages.dataLoadError'), 'error')
        } else if (err.isAxiosError && !err.response) {
          notify(t('infoMessages.networkError'), 'error')
        }
      }
    },
  })

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.addChannelModalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group mb-2">
            <FormControl
              name="name"
              id="name"
              required
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <FormLabel className="visually-hidden" htmlFor="name">
              {t('channels.channelName')}
            </FormLabel>
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={onClose}>
              {t('buttons.resetButton')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('buttons.sendButton')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default Add
