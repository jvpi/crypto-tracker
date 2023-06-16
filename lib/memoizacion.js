let resultado = {}
export default function memoizacion() {
    return function (value) {
        //console.log(value);
        if (!resultado[value]) {
            resultado = {}
            resultado[value] = value
            return false
        }
        return true
    }
}
