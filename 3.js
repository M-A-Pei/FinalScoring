function sortArray(arr){
    arr.forEach((e, i) => {
        if(arr[i] > arr[i+1]){
            const a = arr[i]
            arr[i] = arr[i+1]
            arr[i+1]  = a
        }
    });
    console.log(`array ${arr}`)

    let ganjil = []
    let genap = []
    arr.forEach(e => {
        if(e % 2 == 0){
            genap.push(e)
        }else{
            ganjil.push(e)
        }
    })

    console.log(`ganjil: ${ganjil}`)
    console.log(`genap: ${genap}`)

}

sortArray([1, 3, 2, 5, 10])