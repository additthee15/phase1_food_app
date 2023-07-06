function addToCart(element) {
    let itemCount = document.getElementById('count').value
    itemCount = parseInt(itemCount )+1;
    document.getElementById('countOncart').innerText = itemCount
    document.getElementById('count').innerText = itemCount
    document.getElementById('count').value = itemCount
    sessionStorage.setItem('cart-count',itemCount)

    var itemName = $(element.parentElement).find('.snack').text();
    var price = $(element.parentElement).find('.price').text();
    var imgsrc = $(element.parentElement.parentElement).find('.snackimg').attr('src');
    var parent = document.getElementById(element)
    console.log("prent"+parent)
	var cartItem = {
        snack : itemName,
        price : price,
        imgsrc : imgsrc
    };
    var cartItemJSON = JSON.stringify(cartItem);
    var cartArray = new Array();
    if(sessionStorage.getItem('shopping-cart')) {
        cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'))
    }
    cartArray.push(cartItemJSON)

    var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
	//showCartTable();
}
function loadCartButton() {
    if(sessionStorage.getItem('cart-count')){
    itemCount = sessionStorage.getItem('cart-count')
    document.getElementById('countOncart').innerText = itemCount
    document.getElementById('count').innerText = itemCount
    document.getElementById('count').value = itemCount
    }
}
function showCartTable(){
    if(sessionStorage.getItem('cart-count')){
        itemCount = sessionStorage.getItem('cart-count')
        document.getElementById('countOncart').innerText = itemCount
        document.getElementById('count').innerText = itemCount
        document.getElementById('count').value = itemCount
        }
    var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
    itemCount = shoppingCart.length;
    
    console.log(shoppingCart)
    var cartRowHTML = "<th>Item</th><th>Name</th><th>Price</th>"
    var  total =0
    shoppingCart.forEach(element => {
        var item = JSON.parse(element)
        price = item.price
        priceString = price.substring((price.indexOf('$')+1))
        cartRowHTML += "<tr>" +
                "<td> <img src='" + item.imgsrc +"' width=100px height=100px class='img-circle'></td>" +
				"<td>" + item.snack + "</td>" +
				"<td>$" + priceString + "</td>" +
				"</tr>"
                document.getElementById('tableCart').innerHTML = cartRowHTML
                total += parseFloat(priceString)
    });
    
    document.getElementById('total').innerHTML = "Total: $" + total.toFixed(2)
    
}
function emptyCart() {
    if(sessionStorage.getItem('shopping-cart')) {
        sessionStorage.removeItem('shopping-cart')
    }
    if(sessionStorage.getItem('cart-count')) {
        sessionStorage.removeItem('cart-count')
    }
}