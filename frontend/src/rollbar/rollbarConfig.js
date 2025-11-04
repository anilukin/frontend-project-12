const env = import.meta.env

const rollbarConfig = {
  accessToken: env.VITE_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
}

export default rollbarConfig