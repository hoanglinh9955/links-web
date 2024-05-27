export default defineEventHandler(async (event) => {
  try {
    const { productList } = await readBody(event)
    const displayList = []
    for (let i = 0; i < productList.length; i++) {
      const images = await event.context.cloudflare.env.DB.prepare(
        `SELECT image_url
        FROM images
        WHERE product_id = ?;`,
      ).bind(productList[i].product_id).all()

      const product = await event.context.cloudflare.env.DB.prepare(
        `SELECT *
        FROM products
        WHERE product_id = ?;`,
      ).bind(productList[i].product_id).all()

      const imageUrl = images.results.map(e => e.image_url)
      displayList.push({
        product: product.results[0],
        imageUrl,
        quantity: productList[i].quantity,
      })
    }

    return {
      success: true,
      displayList,
    }
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
