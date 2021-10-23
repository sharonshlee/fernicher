import React, {Fragment, useEffect} from 'react'
import { Popup } from 'react-map-gl'

const PopupCard = ({ selectedProduct, setSelectedProduct }) => {
  
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedProduct(null)
      }
    }
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])

  return (
    <Fragment>
      {selectedProduct && (
        <Popup 
          latitude={selectedProduct.product_location[0]} 
          longitude={selectedProduct.product_location[1]}
          onClose={() => setSelectedProduct(null)}
          >
          <div> 
            <h2><strong>Full name: </strong>{selectedProduct.first_name} {selectedProduct.last_name}</h2>
            <p><strong>Email: </strong>{selectedProduct.email}</p>
            <p><strong>Product Description: </strong>{selectedProduct.product_description}</p>
          </div>
        </Popup>
      )}
    </Fragment>
  )
}

export default PopupCard