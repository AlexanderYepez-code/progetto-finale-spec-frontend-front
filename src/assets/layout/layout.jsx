import Header from "../component/header"
import Footer from "../component/footer"

export default function Layout ({children}){
    return(
        <>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
    )
}