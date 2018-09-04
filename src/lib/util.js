function pluck(arr,key){
    const result = [];

    arr.forEach(it=>{
        result.push(it[key])
    })
    return result;
}

export default{
    pluck,
}