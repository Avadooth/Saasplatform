const axios = require('axios');

exports.getShopifyOrders = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SHOPIFY_STORE_URL}`, {
      headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN }
    });
    console.log("response---->>>",response)
    res.status(200).json(response.data.orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
