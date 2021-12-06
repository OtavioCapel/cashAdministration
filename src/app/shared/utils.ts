export function formatDate(value) {
    if(value.seconds) {
        value = value.seconds * 1000
    }
  
    return new Date(value)
}
