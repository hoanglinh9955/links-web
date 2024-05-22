export default defineEventHandler(async (event) => {
    try {
      const productList = [];
      const products = await event.context.cloudflare.env.DB.prepare(`SELECT * FROM products`).all()
      for (const pro_item of products.results) {
        const images = await event.context.cloudflare.env.DB.prepare(`SELECT image_url FROM images WHERE product_id = ?;`).bind(pro_item.product_id).all();
        const imageUrl = images.results.map(img_item => img_item.image_url)
        productList.push({
          product: pro_item,
          imageUrl,
        })
      };
  
      return {
        status: true,
        productList
      }
    }
    catch (e: any) {
      console.error({
        message: e.message,
      })
      return {
        error: e.message,
      }
    }
  })