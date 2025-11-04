import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import socket from '../utils/socket'
import Message from './Message'
import MessageForm from './MessageForm'
import { addMessage } from '../Slices/messagesSlice'
import { selectChannelMessages } from '../Slices/messagesSlice'

const Messages = ({ selectedChannelId }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const currentChannel = useSelector(state =>
    state.channels.channels.find(ch => ch.id === selectedChannelId),
  )

  const channelMessages = useSelector(state =>
    selectChannelMessages(state, selectedChannelId),
  )

  const username = useSelector(state => state.auth.username)

  useEffect(() => {
    const handleNewMessage = message => {
      dispatch(addMessage(message))
    }
    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [dispatch])

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            {currentChannel && <b>{`# ${currentChannel.name}`}</b>}
          </p>
          <span className="text-muted">
            {t('messages.message', { count: channelMessages.length })}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5">
          {channelMessages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm channelId={selectedChannelId} username={username} />
        </div>
      </div>
    </div>
  )
}

export default Messages
