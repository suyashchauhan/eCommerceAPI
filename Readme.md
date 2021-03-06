# About The API
<!-- 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a434ec8e4682d8d238db)
 -->

![](https://img.shields.io/badge/%F0%9F%A4%96-logged%20in%20as%20customer-blueviolet?style=for-the-badge&labelColor=white)

![](https://img.shields.io/badge/%F0%9F%91%BD-logged%20in%20as%20dealer-blue?style=for-the-badge&labelColor=white)

![](https://img.shields.io/badge/%F0%9F%A4%A0-logged%20in%20as%20admin-red?style=for-the-badge&labelColor=white)
## All routes


### **Category**

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

- :cowboy_hat_face:/category/add ( add a new category )

PUT:

- :cowboy_hat_face:/category/5f5797ccb8f70e19887efdd1 ( update a Category )
- :cowboy_hat_face:/category/update/5f5797ccb8f70e19887efdd1 ( upload a photo  for the category )

DELETE:

- :cowboy_hat_face:/category/5f5797ccb8f70e19887efdd1 ( delete a category )

### **Person**

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

- :robot: :cowboy_hat_face: :alien:/add/customer ( add a new customer )
- :cowboy_hat_face: /add/admin ( add a new admin )
- :cowboy_hat_face: :alien: /add/dealer ( add a new dealer )
- /login ( Login into your account)
- id/forgot ( get password reset link )
- /reset/token (reset password)

### **Product**

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

### **Order**

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

- :robot: :cowboy_hat_face: :alien:/order/add ( add a new order )

PUT:

- :robot: :cowboy_hat_face: :alien:/order/1/pay( pay for order )
- :robot: :cowboy_hat_face: :alien:/order/1/deliver ( deliver the order )

DELETE:

- :robot: :cowboy_hat_face: :alien:/order/cancel/1 ( Cancel the order )

### **Cart**

```js
fields:{
     {
    userId: ObjectId,
    products: [{ productId: ObjectId,qty: Number}],
}
```

GET:

- :robot: :cowboy_hat_face: :alien:/cart ( get all products in the cart )
- :robot: :cowboy_hat_face: :alien:/cart/1/remove ( remove specific product from the cart based on its id )

POST:

- :robot: :cowboy_hat_face: :alien:/cart/add ( add a new products into cart )

DELETE:

- :robot: :cowboy_hat_face: :alien:/cart ( remove all cart items )

### **Review**

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
- :robot: :cowboy_hat_face: :alien:/review/add ( add review )

PUT:

- :robot: :cowboy_hat_face: :alien:/review/1 ( update a review )

DELETE:

- :robot: :cowboy_hat_face: :alien:/review/1 ( delete a review )
