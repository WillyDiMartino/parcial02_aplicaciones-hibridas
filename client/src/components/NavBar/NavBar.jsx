import React from 'react'
import logo from '../../assets/img/f1_logo.png'

const NavBar = () => {
  return (
    <header>
    <h1 class="sr-only">Formula 1 API</h1>
    <nav class="navbar navbar-expand-lg">
        <div class=" container container-fluid">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src={logo} alt="Formula 1 Logo" width="120" height="30"/>
                </a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="/documentacion">Documentación</a>
                </div>
            </div>
        </div>
    </nav>
</header>
  )
}

export {NavBar}