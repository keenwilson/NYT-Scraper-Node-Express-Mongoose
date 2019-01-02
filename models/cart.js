module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;

  // Function to add new item to the cart
  this.add = function(item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      // Give the key to be an article id
      storedItem = this.items[id] = { item: item, qty: 0 };
    }
    storedItem.qty++;
    this.totalQty++;
  };

  // Output an array of items later on
  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
