export default function(that,...rest){
    let result = ''
    for(let i=0;i<rest.length;i++){
        result += rest[i]===undefined ? '' :  that.constructor.name+'-'+rest[i]+' '
    }
    return result
}