function maxPrimeFactor(n) {
	let max = 1
	for(let i=0; i < n/2; i++) {
		if(n%i==0) {
			max=i
		}
	}
	return max
}

console.log(maxPrimeFactor(600851475143))
