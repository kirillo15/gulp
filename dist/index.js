"use strict";


const url = 'https://5fbb23e3cc6c9d001624a937.mockapi.io/Test/productID',
     btn = document.querySelectorAll('.js-product-item__favorites'),
     message = document.querySelector('.message');

let resp = fetch(url, ['GET'])
    .then(response => response.json())
    .then(response => response.map((item) => {
        if(item.success) {
            btn.forEach(item => {
                item.addEventListener('click', function(){
                    message.classList.add('isActive') 
                    setTimeout(() =>  message.classList.remove('isActive'), 1000) 
                })
            })
        }
    }))
    .catch(err => console.error(err))