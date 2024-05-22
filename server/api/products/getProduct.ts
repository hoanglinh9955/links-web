export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    const images = await event.context.cloudflare.env.DB.prepare(
      `SELECT image_url
      FROM images
      WHERE product_id = ?;`
    ).bind(query.product_id).all()

    const product = await event.context.cloudflare.env.DB.prepare(
      `SELECT *
      FROM products
      WHERE product_id = ?;`
    ).bind(query.product_id).all()

    const imageUrl = images.results.map(e => e.image_url);

    return {
      status: true,
      product: product.results[0],
      imageUrl,
    }
   
  }
  catch (e: any) {
    console.error({
      message: e.message,
    })
    return {
      error: e.message
    }
  }
})