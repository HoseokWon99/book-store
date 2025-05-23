const { Cart } = require("./cart");
const { CartItem } = require("./cart.item");

Cart.hasMany(CartItem, { as: "cartItems" });
CartItem.belongsTo(Cart, { foreignKey: "cartId"  });

module.exports = { Cart, CartItem };