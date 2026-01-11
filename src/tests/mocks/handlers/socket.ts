import { http, HttpResponse, ws, delay } from 'msw'

const chatSocket = ws.link('*/socket.io/*')
/**
 * WebSocket handler for real-time communication
 */
chatSocket.addEventListener('connection', ({ client }) => {
  console.log('🔌 Mocked Socket.io connection established')

  client.addEventListener('message', event => {
    console.log('Client sent:', event.data)
  })
})

export const socketHandlers = [
  /**
   * Socket.io Polling Handler
   * When MODE === 'development' or MODE === 'demo', Socket.io uses polling instead of WebSocket
   * This handler simulates the Socket.io server responses for polling transport
   * @see https://socket.io/docs/v4/how-it-works/#polling
   */
  http.all('*/socket.io/*', async ({ request }) => {
    const url = new URL(request.url)
    const transport = url.searchParams.get('transport')
    const sid = url.searchParams.get('sid')

    // Socket.io polling handshake (first request, no session ID)
    if (transport === 'polling' && !sid) {
      // Respond with open packet (session ID)
      return new HttpResponse(
        '0{"sid":"mock-session-id","upgrades":[],"pingInterval":25000,"pingTimeout":20000}',
        {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=UTF-8',
          },
        }
      )
    }

    // Subsequent polling requests (already has session ID)
    if (transport === 'polling' && sid) {
      // Simulate long-polling: keep connection open for a few seconds
      // Real servers would keep it open for ~25 seconds (pingInterval)
      // We use shorter delay (3-5 seconds) to avoid blocking tests
      await delay(3000)
      // Respond with "noop" packet (packet type 6) to keep connection alive
      // This simulates "no messages pending" state
      return new HttpResponse('6', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
        },
      })
    }

    return new HttpResponse(null, { status: 200 })
  }),

  /**
   * Socket.io Polling POST Handler
   * Handles client messages sent via polling
   */
  http.post('*/socket.io/*', () => {
    return new HttpResponse('ok', { status: 200 })
  }),
]
