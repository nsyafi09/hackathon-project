
export default function getNowTime(){
    const now = new Date();
    const Year = now.getFullYear();
    const Month = fillZeroTo2Chara(now.getMonth()+1); 
    const Dates = fillZeroTo2Chara(now.getDate());
    const Hour = fillZeroTo2Chara(now.getHours());    
    const Min = fillZeroTo2Chara(now.getMinutes());    
    const Sec = fillZeroTo2Chara(now.getSeconds());    
    const date_string = `${Year}${Month}${Dates}${Hour}${Min}${Sec}`;
    
    console.log(date_string)
    return date_string;
}

function fillZeroTo2Chara (nums){    
    // if time info have single chara, add zero to head.
    if (nums.toString().length == 1){
        return `0${nums}`;
    }else{
        return `${nums}`;
    }
}