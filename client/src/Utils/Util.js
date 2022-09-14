
export default function getNowTime(){
    const now = new Date();
    const Year = now.getFullYear();
    console.log(Year)
    const Month_raw = now.getMonth()+1;
    var Month = 0;
    if (Month_raw.toString.length == 1){
        Month = `0${Month_raw}`;
    }else{
        Month = Month_raw;
    }
    console.log()
    const Dates = now.getDate();
    console.log(Dates)
    const Hour = now.getHours();
    const Min = now.getMinutes();
    const Sec = now.getSeconds();
    const date_string = `${Year}${Month}${Dates}${Hour}${Min}${Sec}`;
    console.log(date_string)
    return date_string;
}