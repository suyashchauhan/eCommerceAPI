# About The API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a434ec8e4682d8d238db)

## All routes

### Category

```js
fields:
{
  name: String,
  photo:String,  //default:'no-photo.jpg'
}
```

GET:

- /category ( get all Categories )
- /category/5f5797ccb8f70e19887efdd1 ( get specific category based on id )

POST:

- /category/add ( add a new category )

PUT:

- /category/5f5797ccb8f70e19887efdd1 ( update a Category )
- /category/update/5f5797ccb8f70e19887efdd1 ( upload a photo  for the category )

DELETE:

- /category/5f5797ccb8f70e19887efdd1 ( delete a category )

### person

```js

fields:
{
  firstname:String,
  lastname:String,
  username:String,
  email:String,
  role:String,
  password:String,
  phone: Number,
});

```

POST:

- /add/customer ( add a new customer )
- /add/admin ( add a new admin )
- /add/dealer ( add a new dealer )
- /login ( Login into your account)
- id/forgot ( get password reset link )
- /reset/token (reset password)

### product

```js
fields:{
  name: String,
  brand:  String,
  Description:  String,
  Price:  Number,
  Quantity: Number,
  categoryid: ObjectId,
  dealerId: ObjectId,
}
```

GET:

- /product ( get all products )
- /product/1 ( get specific product based on id )

POST:

- /product/add ( add a new product )

PUT:

- /product/1 ( update a product )

### Order

```js
fields: {
  user: ObjectId,
  orderItems: [
    {
      qty: Number,
      productId:ObjectId,
    },
  ],
  shippingAddress: {
    pincode:  String ,
    city:  String,
    address: String,
  },
  isPaid:Boolean,
  isDelivered:Boolean,
  Paidat:Date,
  deliveredat: Date,

}
```

POST:

- /order/add ( add a new order )

PUT:

- /order/1/pay( pay for order )
- /order/1/deliver ( deliver the order )

DELETE:

- /order/cancel/1 ( Cancel the order )

### Cart

```js
fields:{
     {
    userId: ObjectId,
    products: [{ productId: ObjectId,qty: Number}],
}
```

GET:

- /cart ( get all products in the cart )
- /cart/1/remove ( remove specific product from the cart based on its id )

POST:

- /cart/add ( add a new products into cart )

DELETE:

- /cart ( remove all cart items )

### Review

```js
fields:
{
  comment: String,
  rating:  Number,
  user: ObjectId,
  product: ObjectId,
}
```

GET:

- /review ( get a single review by id )

POST:

- /review ( get review by product id )
- /review/add ( add review )

PUT:

- /review/1 ( update a review )

DELETE:

- /review/1 ( delete a review )
