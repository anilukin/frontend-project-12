import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { notify } from '../utils/notify'
import { setChannels } from '../Slices/channelsSlice'
import { setMessages } from '../Slices/messagesSlice'
import Channels from '../Components/Channels'
import Messages from '../Components/Messages'
import { getAuthHeader } from '../utils/getAuthHeader'
import routes from '../utils/routes'

const MainPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatcher = useDispatch()
  const [channelId, setChannel] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const responseChannels = await axios.get(routes.channelsPath(), {
          headers: getAuthHeader(),
        })
        const channels = responseChannels.data
        dispatcher(setChannels(channels))
        setChannel(channels[0].id)

        const responseMessages = await axios.get(routes.messagesPath(), {
          headers: getAuthHeader(),
        })
        const messages = responseMessages.data
        dispatcher(setMessages(messages))
      } catch (err) {
        if (err.isAxiosError && err.response && err.response.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        } else if (err.isAxiosError && err.response) {
          setError(t('infoMessages.dataLoadError'))
          notify(t('infoMessages.dataLoadError'), 'error')
        } else if (err.isAxiosError && !err.response) {
          setError(t('infoMessages.networkError'))
          notify(t('infoMessages.networkError'), 'error')
        }
      }
    }

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      fetchContent()
    }
  }, [navigate, dispatcher, t])

  if (error) {
    return <div className='alert alert-danger'>{error}</div>
  }

  return (
    <div className='d-flex flex-column h-100'>
      <div className='container h-100 my-4 overflow-hidden rounded shadow'>
        <div className='row h-100 bg-white flex-md-row'>
          <Channels selectedChannelId={channelId} handleClick={setChannel} />
          <Messages selectedChannelId={channelId} />
        </div>
      </div>
    </div>
  )
}

export default MainPage
