import sumBy from 'lodash/sumBy'

export const setOrderFormValueHelper = (key, value, setFormValue) => {
  switch (key) {
    case 'add':
      setFormValue((prev) => {
        const products = [
          ...prev.products,
          { product: '', quantity: 1, price: 0 },
        ]
        return {
          ...prev,
          ['products']: products,
          total: sumBy(products, (product) => product.price * product.quantity),
        }
      })
      break
    case 'remove':
      setFormValue((prev) => {
        const products = [
          ...prev.products.filter((_, index) => index !== value.index),
        ]
        return {
          ...prev,
          ['products']: products,
          total: sumBy(products, (product) => product.price * product.quantity),
        }
      })
      break
    case 'product': {
      const { e, index } = value

      console.log('E: >>', e.target.value)

      setFormValue((prev) => {
        const products = prev.products || []

        products[index] = {
          ...products[index],
          product: e.target.value._id,
          price: e.target.value.price,
          quantity: 1,
        }

        return {
          ...prev,
          ['products']: [...products],
          total: sumBy(products, (product) => product.price * product.quantity),
        }
      })
      break
    }
    case 'quantity': {
      const { e, index, max } = value

      console.log('E:>>', e.target.value)

      let quantity = e.target.value

      // if (!Number(quantity)) {
      //   quantity = 1
      // }

      if (Number(e.target.value) > max) {
        quantity = max
      } else if (Number(e.target.value) < 0) {
        quantity = 0
      }

      setFormValue((prev) => {
        const products = prev.products || []

        products[index] = {
          ...products[index],
          quantity: quantity,
        }

        return {
          ...prev,
          ['products']: [...products],
          total: sumBy(products, (product) => product.price * product.quantity),
        }
      })
      break
    }
    default:
      setFormValue((prev) => ({
        ...prev,
        [key]: value,
      }))
      break
  }
}
