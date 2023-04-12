# HappyKids

This is built with `Next.js`, `React.js`, `Tailwindcss`, `tRPC`

Deployment: https://happierkids.vercel.app/

## Feature Requirements

✅ หน้าแรกสําหรับแสดงรายการสินค้า พร้อมตัวกรองหมวดหมู่สินค้า

✅ หน้าข้อมูลผลิตภัณฑ์

✅ ตะกร้าสินค้าและปุ่มชำระเงิน

✅ การแสดงบนชาระเงิน

✅ หน้าชำระเงิน (Integretion with stripe)

✅ หน้าชำระเงินสําเร็จ

## Optional Features

✅ Custom Backend

Here is the schemtics of the Login flow:
![image](https://raw.githubusercontent.com/swissnp/happykids/a6cec56e09e48b790da4f134c4c1afadffae3a92/LoginSchema.png)
If you wondering why we need to implement our custom backend for this project

Since we need to implement our own backend to handle the stripe integration and authorization with the exsisting Skillkamp api.
Learn more: please visit `Inregration with Stripe` section below.👇🏻
<details>
  <summary>✅ Integration with Stripe (with proper backend)</summary>
  <details>
  <summary>you can use the following test card numbers:</summary>
    
4242 4242 4242 4242 (success)

4000 0000 0000 0002 (card decline)

Use a valid future date, such as 12/34, any three-digit CVC.
</details>
We use a custom backend to handle the stripe integration and authorization with the exsisting Skillkamp api.

Here is the schemtics of the flow:
![image](https://raw.githubusercontent.com/swissnp/happykids/a6cec56e09e48b790da4f134c4c1afadffae3a92/Login%3ACheckoutSchema.png)


</details>

✅ Incremental Static Rendering (to imporve performance)

⚪️ Installable (Progressive Web App) [[Bug] image that is hosted on skillkamp.com somehow doesnt work with workbox and next/image you could see my deployment at https://happierkids-git-sw-swiss0404.vercel.app/]
