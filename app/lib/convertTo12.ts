export function convertTo12Hour(timeInput : string) : string{
    let hrs = Number(timeInput.substring(0,2))
    const mins = Number(timeInput.substring(2))
    let hrsString, minsString
    let period;
    if(hrs > 12){
        hrs -= 12;
        period = "PM"
    } else period = "AM"

    if( hrs < 10 ) {
        hrsString = "0" + hrs.toString()
    } else {
        hrsString = hrs.toString()
    }
    if( mins < 10 ){ 
        minsString = "0" + mins.toString()
    } else {
        minsString = mins.toString()
    }

    return hrsString + ":" + minsString + " " + period
}