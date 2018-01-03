var PRICE = 9.99;

new Vue({
    el: '#app',

    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: "80s",
        lastSearch: "",
        loading: false,
        price: PRICE 
    },
    methods: {
        onSubmit: function () {
            this.loading = true;
            this.items = [];

            this.$http
            .get("/search/".concat(this.newSearch))
            .then(function (res) {

                this.lastSearch = this.newSearch;

                this.items= res.data;

                this.loading = false;
               
            })
        },
        addItem: function (index) {

            this.total += PRICE;
            var item = this.items[index];
            var found = false;

            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true;
                    break;
                }
            }

            if (!found) {

                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price : PRICE
                });

            }

        },

        inc: function (item) {
            item.qty++;
            this.total += PRICE;
        },
        dec: function (item) {
            item.qty--;
            this.total -= PRICE;

            if(item.qty <= 0)
            {
                for (let i = 0; i < this.cart.length; i++) {
                    if(this.cart[i].id === item.id)
                    {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }        
    },
    filters: {
        currency: function(price)
        {
            return "$".concat(price.toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();
    }


});