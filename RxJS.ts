    let beers = [
      { name: 'Stella', country: 'Belgium', price: 9.5 },
      { name: 'Sam Adams', country: 'USA', price: 8.5 },
      { name: 'Bud Light', country: 'USA', price: 6.5 },
      { name: 'Brooklyn Larger', country: 'USA', price: 8.0 },
      { name: 'Sapporo', country: 'Japan', price: 7.5 }
    ]
    
    
    // ""of"" Converts the arguments to an observable sequence.
    let reza$ = of(beers[0].name, true, 112, 'Reza')

    // ""from"" Creates an Observable from an Array, an array-like object.
    let reza1$ = from(beers)
    
    reza$.subscribe(val => console.log(val));
    reza1$.subscribe(val => console.log(val));
    
    //  ""concat"" Creates an output Observable which sequentially emits all values from given Observable
    concat(reza$, reza1$).subscribe(val => console.log(val));
    
    //Creates an Observable that emits events of a specific type coming from the given event target like HTML elements
    const myButton = document.getElementById('myButton')
    fromEvent(myButton, 'click').subscribe(e => console.log(e))
    
        const reza$ = from(beers)

    // Subscribing with Observer
    // Observer process values and objects receive from observable
    const bookObserver = {
      next: beer => console.log(`Beer Name is ${beer.name}`),
      error: err => console.log(`Error is ${err.name}`),
      complete: () => console.log(`It is completed`)
    }

    reza$.subscribe(bookObserver)

    // Subscribing with Callbacks
    // Pass the functions with the correct order. All three functions are optional and regular subscriptions on the top is 
    // this technoque with no error & complete functions.

    reza$.subscribe(
      beer => console.log(`Beer Name is ${beer.name}`),
      err => console.log(`Error is ${err.name}`),
      () => console.log(`It is completed`))
      
    // ****************** OPERATORS **********************

    //"pipe" is a method in observables to chain operators as comma separated list
    let source$ = of(1, 2, 3, 4, 5)

    source$.pipe(
      filter(val =>val>2),
      map(val=>val*2)
    ).subscribe(val=>console.log(val))
      
    let beers = [
      { name: 'Stella', country: 'Belgium', price: 9.5 },
      { name: 'Sam Adams', country: 'USA', price: 8.5 },
      { name: 'Bud Light', country: 'USA', price: 6.5 },
      { name: 'Brooklyn Larger', country: 'USA', price: 8.0 },
      { name: 'Sapporo', country: 'Japan', price: 7.5 }
    ]

    // "mergeMap" Convert Array of objects to individual objects 
    // "tap" does not change the value. It provides a location to rub a small code
    let reza$ = of(beers).pipe(
      mergeMap(val => val),
      filter(beer => beer.price > 8),
      tap(beer => console.log(`the origin country is: ${beer.country}`))
    ).subscribe(val => console.log(val)) 
    
    // ***** HANDLING ERRORS *****
    // Using "catchError" to return an observable and subscribe to it to skip the error
    let reza$ = of(beers).pipe(
      mergeMap(val => val),
      filter(beer => beer.price > 8),
      tap(beer => console.log(`the origin country is: ${beer.country}`)),
      catchError(err =>of({name: 'Unknown', country: 'Unknown', price: 0 }))
    ).subscribe(
      val => console.log(val),
      err => console.log(`ERROR: ${err}`)
    )

    // Using "take" you specify the number of values you want. Also it "Completes" the observable
    let reza$ = interval(1000)
    reza$.pipe(
      take(3)
    ).subscribe(
      val => console.log(val),
      null,
      () => console.log('All Done!'))

    // Using "takeUntil" you continue to take values from source observable until the first
    // value comes from the other observable (cancelTimer$). The completion handler also executed.
    let button = document.getElementById('myButton')
    let cancelTimer$ = fromEvent(button, 'click')

    let reza$ = interval(1000)
    reza$.pipe(
      takeUntil(cancelTimer$ )
    ).subscribe(
      val => console.log(val),
      null,
      () => console.log('All Done!'))
