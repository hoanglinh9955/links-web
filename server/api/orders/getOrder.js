export default defineEventHandler(async (event) => {
  try {
    const result = await event.context.cloudflare.env.DB.prepare(
          `SELECT * from 'orders' `)
      .all()
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
