

export function convertHourStringToMinutes(hourString: string){
    const [hours, minutes] = hourString.split(':').map(Number)

    const minutesAmounts = (hours * 60) + minutes;

    return minutesAmounts
}