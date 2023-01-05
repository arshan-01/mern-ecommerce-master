import React from 'react'

const Header = (props) => {
  return (
    <div>
    <header className="bg-dark py-5 mt-5">
            <div className="container px-3 px-lg-5 my-4">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder text-white">#{props.title}</h1>
                    <p className="lead fw-normal text-white-50 mb-0">{props.sub}</p>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header