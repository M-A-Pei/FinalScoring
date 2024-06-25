function drawSikuSiku(n){
    if(n <= 0 || n >= 10){
        console.log("angka terlalu tinggi/rendah")
        return;
    }
    let primes = []
    for(let i = 2; i <= n*2*n*n; i++){
        let count = 0
        for(let j = 1; j <= n*2*n*n; j++){
            if(i % j == 0){
                count++
            }
        }

        if(count == 2){
            primes.push(i)
        }
    }

    let primeCount = 0
    for(let i = 1; i <= n; i++){
        let line = ""
        for(let j = 0; j < i; j++){
            line += primes[primeCount] + " "
            primeCount++
        }
        console.log(line)
    }
}

drawSikuSiku(6)