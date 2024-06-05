export default defineEventHandler(async (event) => {
  try {
    const { order, products } = await readBody(event)

    const result1 = await event.context.cloudflare.env.DB.prepare(
      `INSERT INTO 'orders' (order_id, user_id, user_name, phone_number, email, total, method, address, status, date, time, revenue, month)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13);`)
      .bind(order.order_id, order.user_id, order.user_name, order.phone_number, order.email, order.total, order.method, order.address, order.status, order.date, order.time, order.revenue, order.month)
      .run()

    for (let i = 0; i < products.length; i++) {
      const result2 = await event.context.cloudflare.env.DB.prepare(
        `INSERT INTO 'order_items' (order_item_id, order_id, product_id, quantity, price)
        VALUES (?1, ?2, ?3, ?4, ?5);`,
      ).bind(i.toString() + Date.now().toString(), order.order_id, products[i].product.product_id, products[i].quantity, products[i].product.price).run()

      const result3 = await event.context.cloudflare.env.DB.prepare(
        `UPDATE 'products'
        SET stock = ?1
        WHERE product_id = ?2;`,
      ).bind(products[i].product.stock - products[i].quantity, products[i].product.product_id).run()
    }

    return {
      result1,
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
