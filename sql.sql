SELECT 
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
WHERE o.order_id = 'ORDER-1717325180381'


const productList = [
    {'product_id': '1', 'product_name': 'Product 1'},
    {'product_id': '2', 'product_name': 'Product 2'},
    {'product_id': '1', 'product_name': 'Product 1'},
    {'product_id': '3', 'product_name': 'Product 3'},
    {'product_id': '2', 'product_name': 'Product 2'},
    {'product_id': '4', 'product_name': 'Product 4'},
    {'product_id': '5', 'product_name': 'Product 5'}
];

const uniqueProducts = Array.from(new Set(productList.map(product => product.product_id)))
    .map(product_id => productList.find(product => product.product_id === product_id));

console.log(uniqueProducts);
console.log(typeof(uniqueProducts))