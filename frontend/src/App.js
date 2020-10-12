import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
    return (
        <>
            <Header />
            <main className='py-3'>
                <Container>
                    <h1>Welcome to ProShop</h1>
                    <HomeScreen></HomeScreen>
                </Container>
            </main>
            <Footer />
        </>
    )
}

export default App
