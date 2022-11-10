type StoreType = {
    courses: {
        USDtoUAH: number,
        EURtoUAH: number,
        USDtoEUR: number
    }
}

export let store: StoreType ={
    courses: {
        USDtoUAH: 0,
        EURtoUAH: 0,
        USDtoEUR: 0
    }
}

export const setStore = (value: StoreType) =>{
    store = value
}