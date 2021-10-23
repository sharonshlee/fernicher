import {useState, useEffect} from 'react';

const useProductCard = (props) => {
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Adds ability to close selectedProduct with the escape key. 
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

  return { selectedProduct, setSelectedProduct }
}

export default useProductCard