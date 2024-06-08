export default defineEventHandler(async (event) => {
  try {
    const { order_id, status } = await readBody(event)

    const result = await event.context.cloudflare.env.DB.prepare(
      `UPDATE 'orders'
          SET status = ?1
          WHERE order_id = ?2; `)
      .bind(status, order_id).run()

    return result
  }
  catch (e) {
    console.error({
      message: e.message,
    })
    return {
      error: e.message,
    }
  }
})
