export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        
      const result = await event.context.cloudflare.env.DB.prepare(
        `SELECT 
        o.order_id,
        p.product_id,
        p.product_name,
        p.description AS product_description,
        p.price AS product_price,
        oi.quantity,
        i.image_url
    FROM 
        orders o
    JOIN 
        order_items oi ON o.order_id = oi.order_id
    JOIN 
        products p ON oi.product_id = p.product_id
    LEFT JOIN 
        images i ON p.product_id = i.product_id
    WHERE o.order_id = ?;
    `,)
        .bind(query.order_id).all()
        
        const uniqueProducts = Array.from(new Set(result.results.map(product => product.product_id)))
    .map(product_id => result.results.find(product => product.product_id === product_id));


      return {
        success: true,
        products: uniqueProducts
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
  