
# About The API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a434ec8e4682d8d238db)

## Indices

* [Cart](#cart)

  * [Get all items (user logged in )](#1-get-all-items-(user-logged-in-))
  * [cart items push](#2-cart-items-push)
  * [remove the items for the cart](#3-remove-the-items-for-the-cart)

* [Category](#category)

  * [Add a new Category](#1-add-a-new-category)
  * [Delete Category](#2-delete-category)
  * [Get a single category](#3-get-a-single-category)
  * [Get all Categories](#4-get-all-categories)
  * [Update a Category](#5-update-a-category)
  * [Upload a photo](#6-upload-a-photo)

* [Customer](#customer)

  * [Add a dealer](#1-add-a-dealer)
  * [Add a new customer (if role specify it)](#2-add-a-new-customer-(if-role-specify-it))
  * [Add admin](#3-add-admin)
  * [Forgot Password](#4-forgot-password)
  * [Login](#5-login)
  * [Reset Password link](#6-reset-password-link)

* [Product](#product)

  * [Get all products](#1-get-all-products)
  * [Get single product](#2-get-single-product)
  * [Update the product](#3-update-the-product)
  * [{{URL}}/product/add](#4-{{url}}productadd)

* [Review](#review)

  * [Add a review](#1-add-a-review)
  * [Delete a review](#2-delete-a-review)
  * [Get all reviews of a product](#3-get-all-reviews-of-a-product)
  * [Get single Review  by reviewID](#4-get-single-review--by-reviewid)
  * [Update a review](#5-update-a-review)


--------


## Cart



### 1. Get all items (user logged in )



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/cart/
```



### 2. cart items push



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/cart/5f663eb8b97e8f3b10c887b3/add
```



### 3. remove the items for the cart



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/cart/5f663eb8b97e8f3b10c887b3/remove
```



## Category
Get , Add , Update , Delete , Photo routes 



### 1. Add a new Category


Add a Category



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/category/add
```



***Body:***

```js        
{
    "name":"Pendrive"
}
```



### 2. Delete Category



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/category/5f53dc6f322dc84994199e5a
```



### 3. Get a single category



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/category/5f53dc5b322dc84994199e59
```



### 4. Get all Categories



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/category/
```



### 5. Update a Category



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/category/5f5797b6b8f70e19887efdd1
```



***Body:***

```js        
{
    "name":"CPUischanged"
}
```



### 6. Upload a photo



***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/category/update/5f579b2b94486043dcd6462a
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



## Customer



### 1. Add a dealer



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/add/dealer
```



***Body:***

```js        
{
    "firstname":"joe",
    "lastname":"user",
    "phone":9678954123,
    "password":123457,
    "username":"dealer2",
    "email":"cer9@gmail.com"
}
```



### 2. Add a new customer (if role specify it)



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/add/customer
```



***Body:***

```js        
{
    "firstname":"joe",
    "lastname":"user",
    "phone":9678954123,
    "password":123457,
    "username":"dealer2",
    "email":"hi4@gmail.com"
}
```



### 3. Add admin



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/add/admin
```



***Body:***

```js        
{
    "firstname":"joe",
    "lastname":"user",
    "phone":9678954123,
    "password":123457,
    "username":"admin3",
    "email":"h40@gmail.com"
}
```



### 4. Forgot Password


Generate the token and send to mail 


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/5f60d359df94de06203dc132/forgot
```



### 5. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/login
```



***Body:***

```js        
{
    "username":"joeuser",
    "password":"123457"
}
```



### 6. Reset Password link



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/reset/6b388ae10e1b9dc86b9d1a072a29306f2af5905f994ba675
```



***Body:***

```js        
{
    "password":"thats ok"
}
```



## Product



### 1. Get all products



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/product/
```



### 2. Get single product



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/product/5f64e4e0f64a1c41a448674f
```



### 3. Update the product


    


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/product/5f64e4e0f64a1c41a448674f
```



***Body:***

```js        
{
        "name": "Dell G3",
        "brand": "DELL",
        "Description": "i5 8-generation FHD SLIM black colour",
        "Price": 74000,
        "Quantity": 456,
        "dealerId": "5f5cf2cb844c003980257832",
        "categoryid": "5f579b0f94486043dcd64627"
}
```



### 4. {{URL}}/product/add



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/product/add
```



***Body:***

```js        
{
    "name":"Dell G3",
    "brand":"DELL",
    "Description":"i5 8-generation FHD SLIM black colour",
    "Price":75000,
    "Quantity":12,
    "dealerId":"5f5cf2cb844c003980257832",
    "categoryid":"5f579b0f94486043dcd64627"
}
```



## Review



### 1. Add a review


Add a review


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/review/add
```



***Body:***

```js        
{
    "user":"5f5cf28a844c00398025782f",
    "comment":"haan thik hai ",
    "rating":4,
    "product":""
}
```



### 2. Delete a review


Delete a request by ID 


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/review/5f7771ac94e7303960f31136
```



### 3. Get all reviews of a product


Get all reviews of a product by its ID 


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/review/s/5f663db0427b0f357c1bb16a
```



### 4. Get single Review  by reviewID


Get a review by its own ID 


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/review/5f7771ac94e7303960f31136
```



***Body:***

```js        
{
    "comment":"yup a good product",
    "rating":7,
    "userId":"5f5cf28a844c00398025782f",
    "product":""
}
```



### 5. Update a review



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/review/5f77762394e7303960f31137
```



***Body:***

```js        
{
    "user":"5f5cf28a844c00398025782f",
    "comment":"haan thik hai 7",
    "rating":4,
    "product":"5f663db0427b0f357c1bb16a"
}
```



---
[Back to top](#pccart)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-10-18 13:01:40 by [docgen](https://github.com/thedevsaddam/docgen)
