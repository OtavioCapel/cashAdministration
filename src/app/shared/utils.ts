export function formatDate(value) {
    if(value.seconds) {
        value = value.seconds * 10000
    }
  
    return new Date(value)
}
