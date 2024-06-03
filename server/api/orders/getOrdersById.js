export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)

    const result = await event.context.cloudflare.env.DB.prepare(
        `SELECT * from 'orders' WHERE user_id = ?;`)
      .bind(query.user_id).all()

    return result;
    
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
