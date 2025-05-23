const { Order } = require("./order");
const { OrderedBook } = require("./ordered.book");

Order.hasMany(OrderedBook, { as: "orderedBooks" });
OrderedBook.belongsTo(Order, { foreignKey: "orderId" });

module.exports ={ Order, OrderedBook };