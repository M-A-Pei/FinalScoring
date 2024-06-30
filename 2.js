function hitungVoucher(name, price){
    let output
    let discount
    if(name == "DumbWaysJos"){
        if(price >= 50000){
            output = price - (price * (21.1/100))
            discount = 21.1
        }
    }else if(name == "DumbWaysMantap"){
        if(price >= 80000){
            output = price - (price * (30/100))
            discount = 30
        }
    }else{
        console.log("tidak dapat diskon bleeeeh XD")
    }

    console.log(`uang yang harus di bayar: ${output}`)
    console.log(`diskon: ${discount}`)
}

hitungVoucher("DumbWaysJos", 100000)