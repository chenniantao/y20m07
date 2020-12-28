export default {
    formatPrice(price = 0) {
        return parseFloat(price).toFixed(2)
    },
    formatDate(date) {
        return new Date(date).toLocaleString()
    }
}