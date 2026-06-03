1//1. React è un framework per lo sviluppo di SPA basato sui componenti 
// 2. un componente in ract e una funzione che restituisce JXS
//3. Il jsx e un formato che permette di scrivere sia in html mischiato con js
// 4. la differenza tra prop e state, le prop sono solo delle infrmazioni che passa un componenete padre a un componenete figlio, mentre lo state e una forma di variabile che quando cambia fa iun modo che l'interfaccia si aggiorni
// 5. restituisce 0 i hook usestate seve per aggiornare lo stato infatti è composta da count che è la variabile e setCount che e la funzione per l'aggionamento dello state
// 6. è sbagliato perche lo state non si aggiona come una varibile di js ma ha bisogno della sua funzione per l'aggiornamentro infatti per aggiuornare serve fare setCount(prev => prev + 1)

// 8

const [user, setUser] = useState({
    nome: "Mario",
    eta: 20
});

setUser({
    ...user,
    eta : 21
})

//che cosa è il context = è un mecfanismo che permette do condividere dati tra componenti senza dover passare le props manualmente attraverso tutti i livelli della gerarchia, viene creati con createcontext, fornito tramite provider e consulmato trammite il hook useContext
//prop drilling = e un problmea di react, in poche parole quando noi passiamo delle prop a un componente figlòio non esistono molti problemi, ma se dovessimo passare le props da un componente padre a un componente bisnipote(cosi per dire) le prop devono passare da tutti i com,ponenti del mezzo prima< di arrivare al conponente che ha bisogno e questo rende il codice complesso e difficile da mantere 

//useEffect

//1. useEffect serve per eseguire effetti collaterali (side effects) dopo il render del componente.
//2. Il codice viene eseguito solo una volta al momento del montaggio del componente, e nel caso mettimo una variabile di stato dentro l'array delle dipendeze questa si riesegue ogni volte che lo stato cambia
//3. quando useEffect non ha l'array delle dipendenze viene effetuato a ogni render
//4. ogni volta che count cambia e al primo render
//5. serve a rimuovere risorse create dall'effect quando il componente viene smontato o prima della riesecuzione dell'effect.

//useRef
//useRef serve per mantenere un valore mutabile che non deve influenzare il ciclo di rendering di React
//1. dati che NON devono aggiornare la UI ma devono persistere, metre useState lo utilizzo quando voglio ad ogni cambio dello state un re-render del componente per ersempio in un input controllato
//2. è la proprietà dove React salva il valore reale
//3. non aggiorna nulla se per esempio fosse dentro un input si potrebbe fare input.current.value = 3
//4. useref serve nel dom appuntyo èer poter acccedere al elemento del dom come un input oppure viene utilizzato grazie alle sue propieta anche a fare animazione con lo scrool o inserire i controlli nei video
//useCallBack
// useCallback serve a memorizzare una funzione e non ricrearla ad ogni render.

//1. la useCallback e un hook quindi non ha niente a che vedere con uan funzione normale, la funzione se inserita al'internoi del componente questa viene ricreata ad ogni render del compèonente mentre usecallback cambia soltanto se le sue dipendenza cabiano
// 2. il debaunce e una tecnica della programazione che serve per non richiamare una funzione troppe volte ma aspetta tot tempo dopo che l'utente smette di digitare per far partire la chiamata, mentre il throttle invece e una funzione chhe viene eseguita ogni tot tempo
// 3. le custom hook devono rispertare alcune regole 1. devono sempre iniziare con use, 2. possono uttilizzare hook nativi di reactr 3. devono essere funzioni ma senza modificare direttamnete il dom
// 4. si puo utilizzare perche sono hook nativi 

//risposte del context

//1. ls differenza principasle e che useMemo serve per salvare un calcolo che magari e molto pesante e non si vuole ri8fare a ogni render, e usecallback invece serve a non ricreare a ogni render una funzione che si troa al suo interno a meno che non cambi le dipendeze
//2. useMemo non si utlizza solo e soltanto il calcolo che si vuole performare e m olto pesante o repetitivo
// 3 , in JavaScript le funzioni sono oggetti, quindi ad ogni render del componente React viene rieseguita la funzione componente e le funzioni interne vengono ricreate in memoria con nuova referenza
// 4. usecallback non serpre migliora la perfroman cce solo se ce una funzione che non si vuole ricreare ogni volta


