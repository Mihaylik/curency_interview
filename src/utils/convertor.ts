import { requestOptions } from "./requestParrametrs";


export const convert = (dispatch: React.Dispatch<React.SetStateAction<number>>, from: string, to: string = 'UAH', amount: number = 1) =>{
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
        .then(response => response.text())
        .then(result => { 
            const value = JSON.parse(result)['result'] 
            dispatch(value)
            console.log({value})
        })
}