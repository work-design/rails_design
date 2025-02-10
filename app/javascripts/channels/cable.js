import { createConsumer } from '@rails/actioncable/src'

const consumer = createConsumer()
window.consumer = consumer

export default consumer
