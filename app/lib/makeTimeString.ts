export function makeTimeString(timeString : Date){
    const hrs = timeString.getHours()
    const mins = timeString.getMinutes()
    const hrsString = hrs < 10 ? `0${hrs}` : `${hrs}`
    const minString = mins < 10 ? `0${mins}` : `${mins}`

    return `${hrsString}${minString}`
}